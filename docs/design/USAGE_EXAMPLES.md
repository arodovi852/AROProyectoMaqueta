# Ejemplos de Uso - Backend BROADCASTTD

Este documento contiene ejemplos prácticos de cómo usar los modelos, DTOs y repositorios en diferentes escenarios.

---

## 📦 Tabla de Contenidos

1. [Gestión de Usuarios](#gestión-de-usuarios)
2. [Gestión de Productos](#gestión-de-productos)
3. [Gestión de Categorías](#gestión-de-categorías)
4. [Carrito de Compras](#carrito-de-compras)
5. [Procesamiento de Pedidos](#procesamiento-de-pedidos)
6. [Sistema de Contacto](#sistema-de-contacto)
7. [Casos de Uso Completos](#casos-de-uso-completos)

---

## Gestión de Usuarios

### Registro de Usuario

```typescript
import { User, UserRole } from './models';
import { CreateUserDto, UserResponseDto } from './dtos';
import { IUserRepository } from './repositories';

// DTO de entrada del frontend
const registerDto: CreateUserDto = {
  email: 'juan@ejemplo.com',
  password: 'MiPassword123!',
  firstName: 'Juan',
  lastName: 'Pérez',
  phone: '+34666555444'
};

// En el servicio de usuarios
class UserService {
  constructor(private userRepo: IUserRepository) {}

  async register(dto: CreateUserDto): Promise<UserResponseDto> {
    // 1. Verificar si el email ya existe
    const exists = await this.userRepo.existsByEmail(dto.email);
    if (exists) {
      throw new Error('El email ya está registrado');
    }

    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Crear el modelo de usuario
    const user = new User({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      role: UserRole.CUSTOMER,
      isActive: true
    });

    // 4. Guardar en la base de datos
    const savedUser = await this.userRepo.create(user);

    // 5. Retornar DTO de respuesta (sin contraseña)
    return {
      id: savedUser.id,
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      fullName: savedUser.fullName,
      phone: savedUser.phone,
      role: savedUser.role,
      isActive: savedUser.isActive,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    };
  }
}
```

### Login de Usuario

```typescript
import { LoginDto, AuthResponseDto } from './dtos';

async function login(dto: LoginDto): Promise<AuthResponseDto> {
  // 1. Buscar usuario por email
  const user = await userRepo.findByEmail(dto.email);
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  // 2. Verificar que esté activo
  if (!user.isActive) {
    throw new Error('Cuenta desactivada');
  }

  // 3. Verificar contraseña
  const isValid = await bcrypt.compare(dto.password, user.password);
  if (!isValid) {
    throw new Error('Credenciales inválidas');
  }

  // 4. Generar token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // 5. Retornar respuesta con token
  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    },
    token,
    expiresIn: 7 * 24 * 60 * 60 // 7 días en segundos
  };
}
```

---

## Gestión de Productos

### Crear Producto con Validaciones

```typescript
import { Product } from './models';
import { CreateProductDto, ProductResponseDto } from './dtos';
import { IProductRepository, ICategoryRepository } from './repositories';

async function createProduct(
  dto: CreateProductDto,
  productRepo: IProductRepository,
  categoryRepo: ICategoryRepository
): Promise<ProductResponseDto> {
  // 1. Validar que la categoría existe y está activa
  const category = await categoryRepo.findById(dto.categoryId);
  if (!category || !category.isActive) {
    throw new Error('Categoría no válida');
  }

  // 2. Validar que el SKU es único
  if (dto.sku) {
    const exists = await productRepo.existsBySku(dto.sku);
    if (exists) {
      throw new Error(`SKU ${dto.sku} ya está en uso`);
    }
  }

  // 3. Crear el modelo de producto
  const product = new Product({
    name: dto.name,
    description: dto.description,
    shortDescription: dto.shortDescription,
    price: dto.price,
    stock: dto.stock,
    categoryId: dto.categoryId,
    imageUrl: dto.imageUrl,
    icon: dto.icon,
    color: dto.color,
    features: dto.features,
    isFeatured: dto.isFeatured ?? false,
    sku: dto.sku,
    weight: dto.weight,
    tags: dto.tags || [],
    isActive: true
  });

  // 4. Guardar en la base de datos
  const savedProduct = await productRepo.create(product);

  // 5. Retornar DTO de respuesta
  return {
    id: savedProduct.id,
    name: savedProduct.name,
    description: savedProduct.description,
    shortDescription: savedProduct.shortDescription,
    price: savedProduct.price,
    formattedPrice: savedProduct.getFormattedPrice(),
    stock: savedProduct.stock,
    isInStock: savedProduct.isInStock(),
    categoryId: savedProduct.categoryId,
    categoryName: category.name,
    imageUrl: savedProduct.imageUrl,
    icon: savedProduct.icon,
    color: savedProduct.color,
    features: savedProduct.features,
    isActive: savedProduct.isActive,
    isFeatured: savedProduct.isFeatured,
    sku: savedProduct.sku,
    weight: savedProduct.weight,
    tags: savedProduct.tags,
    createdAt: savedProduct.createdAt,
    updatedAt: savedProduct.updatedAt
  };
}
```

### Búsqueda y Filtrado de Productos

```typescript
import { ProductFilterDto, ProductPageResponseDto } from './dtos';

async function searchProducts(
  filters: ProductFilterDto,
  productRepo: IProductRepository
): Promise<ProductPageResponseDto> {
  // 1. Aplicar filtros
  const { products, total } = await productRepo.findWithFilters({
    categoryId: filters.categoryId,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    inStock: filters.inStock ?? true,
    isFeatured: filters.isFeatured,
    search: filters.search,
    tags: filters.tags,
    sortBy: filters.sortBy || 'createdAt',
    sortOrder: filters.sortOrder || 'desc',
    page: filters.page || 1,
    limit: filters.limit || 20
  });

  // 2. Calcular paginación
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const totalPages = Math.ceil(total / limit);

  // 3. Convertir a DTOs de listado
  const productDtos = products.map(p => ({
    id: p.id,
    name: p.name,
    shortDescription: p.shortDescription,
    price: p.price,
    formattedPrice: p.getFormattedPrice(),
    imageUrl: p.imageUrl,
    icon: p.icon,
    color: p.color,
    isInStock: p.isInStock(),
    isFeatured: p.isFeatured,
    categoryName: p.categoryId // Se obtendría con un join
  }));

  // 4. Retornar respuesta paginada
  return {
    products: productDtos,
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
}
```

---

## Gestión de Categorías

### Crear Árbol de Categorías

```typescript
import { Category } from './models';
import { CategoryTreeDto } from './dtos';
import { ICategoryRepository } from './repositories';

async function getCategoryTree(
  categoryRepo: ICategoryRepository
): Promise<CategoryTreeDto[]> {
  // 1. Obtener todas las categorías activas
  const allCategories = await categoryRepo.findActiveCategories();

  // 2. Construir estructura de árbol
  const buildTree = (parentId?: string): CategoryTreeDto[] => {
    return allCategories
      .filter(cat => cat.parentId === parentId)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        productCount: 0, // Se obtendría con countProducts
        children: buildTree(cat.id)
      }));
  };

  return buildTree(undefined); // Categorías raíz
}
```

### Breadcrumb de Categoría

```typescript
async function getCategoryBreadcrumb(
  categoryId: string,
  categoryRepo: ICategoryRepository
): Promise<Array<{ id: string; name: string; slug: string }>> {
  const path = await categoryRepo.getCategoryPath(categoryId);
  
  return path.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug
  }));
}

// Uso:
// Resultado: [
//   { id: '1', name: 'Tecnología', slug: 'tecnologia' },
//   { id: '2', name: 'Cloud', slug: 'cloud' },
//   { id: '3', name: 'IaaS', slug: 'iaas' }
// ]
```

---

## Carrito de Compras

### Añadir Producto al Carrito

```typescript
import { CartItem } from './models';
import { AddToCartDto, CartResponseDto } from './dtos';
import { ICartItemRepository, IProductRepository } from './repositories';

async function addToCart(
  dto: AddToCartDto,
  cartRepo: ICartItemRepository,
  productRepo: IProductRepository
): Promise<CartResponseDto> {
  // 1. Verificar que el producto existe y está activo
  const product = await productRepo.findById(dto.productId);
  if (!product || !product.isActive) {
    throw new Error('Producto no disponible');
  }

  // 2. Verificar que hay stock suficiente
  if (!product.hasStock(dto.quantity)) {
    throw new Error(`Stock insuficiente. Disponible: ${product.stock}`);
  }

  // 3. Verificar si ya está en el carrito
  const existingItem = await cartRepo.findByUserIdAndProductId(
    dto.userId,
    dto.productId
  );

  if (existingItem) {
    // 3a. Incrementar cantidad
    const newQuantity = existingItem.quantity + dto.quantity;
    if (!product.hasStock(newQuantity)) {
      throw new Error('No hay suficiente stock para esa cantidad');
    }
    await cartRepo.updateQuantity(dto.userId, dto.productId, newQuantity);
  } else {
    // 3b. Crear nuevo item
    const cartItem = new CartItem({
      userId: dto.userId,
      productId: dto.productId,
      quantity: dto.quantity
    });
    await cartRepo.create(cartItem);
  }

  // 4. Obtener el carrito actualizado
  return await getCart(dto.userId, cartRepo, productRepo);
}
```

### Obtener Carrito con Detalles

```typescript
async function getCart(
  userId: string,
  cartRepo: ICartItemRepository,
  productRepo: IProductRepository
): Promise<CartResponseDto> {
  // 1. Obtener items del carrito con detalles de productos
  const items = await cartRepo.getCartWithProductDetails(userId);

  // 2. Calcular totales
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * 0.21; // 21% IVA
  const total = subtotal + tax;

  // 3. Retornar DTO de carrito
  return {
    userId,
    items: items.map(item => ({
      id: item.cartItem.id,
      userId: item.cartItem.userId,
      productId: item.cartItem.productId,
      productName: item.productName,
      productPrice: item.productPrice,
      productImageUrl: item.productImageUrl,
      productStock: item.productStock,
      quantity: item.cartItem.quantity,
      subtotal: item.subtotal,
      createdAt: item.cartItem.createdAt,
      updatedAt: item.cartItem.updatedAt
    })),
    itemCount: items.length,
    totalItems: items.reduce((sum, item) => sum + item.cartItem.quantity, 0),
    subtotal,
    tax,
    total,
    updatedAt: items[0]?.cartItem.updatedAt || new Date()
  };
}
```

---

## Procesamiento de Pedidos

### Crear Pedido desde Carrito

```typescript
import { Order, OrderItem } from './models';
import { CreateOrderDto, OrderResponseDto } from './dtos';
import { 
  IOrderRepository, 
  IOrderItemRepository,
  ICartItemRepository,
  IProductRepository 
} from './repositories';

async function createOrderFromCart(
  dto: CreateOrderDto,
  orderRepo: IOrderRepository,
  orderItemRepo: IOrderItemRepository,
  cartRepo: ICartItemRepository,
  productRepo: IProductRepository
): Promise<OrderResponseDto> {
  // 1. Obtener items del carrito
  const cartItems = await cartRepo.findByUserId(dto.userId);
  if (cartItems.length === 0) {
    throw new Error('El carrito está vacío');
  }

  // 2. Verificar stock y calcular totales
  let subtotal = 0;
  const orderItems: OrderItem[] = [];

  for (const cartItem of cartItems) {
    const product = await productRepo.findById(cartItem.productId);
    
    if (!product || !product.isActive) {
      throw new Error(`Producto ${cartItem.productId} no disponible`);
    }

    if (!product.hasStock(cartItem.quantity)) {
      throw new Error(
        `Stock insuficiente para ${product.name}. ` +
        `Disponible: ${product.stock}, Solicitado: ${cartItem.quantity}`
      );
    }

    // Crear item de pedido
    const itemTotal = product.price * cartItem.quantity;
    subtotal += itemTotal;

    orderItems.push(new OrderItem({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      quantity: cartItem.quantity,
      unitPrice: product.price,
      totalPrice: itemTotal,
      discount: 0
    }));
  }

  // 3. Calcular totales del pedido
  const taxAmount = subtotal * 0.21;
  const shippingCost = dto.shippingCost || 0;
  const discountAmount = dto.discountAmount || 0;
  const totalAmount = subtotal + taxAmount + shippingCost - discountAmount;

  // 4. Crear el pedido
  const order = new Order({
    userId: dto.userId,
    subtotal,
    taxAmount,
    shippingCost,
    discountAmount,
    totalAmount,
    shippingAddress: dto.shippingAddress,
    billingAddress: dto.billingAddress,
    notes: dto.notes
  });

  const savedOrder = await orderRepo.create(order);

  // 5. Crear los items del pedido
  const savedItems = await Promise.all(
    orderItems.map(item => 
      orderItemRepo.create({
        ...item,
        orderId: savedOrder.id
      })
    )
  );

  // 6. Reducir el stock de los productos
  await Promise.all(
    cartItems.map(async cartItem => {
      await productRepo.reduceStock(cartItem.productId, cartItem.quantity);
    })
  );

  // 7. Vaciar el carrito
  await cartRepo.clearCart(dto.userId);

  // 8. Retornar DTO de respuesta
  return {
    id: savedOrder.id,
    userId: savedOrder.userId,
    orderNumber: savedOrder.orderNumber,
    status: savedOrder.status,
    items: savedItems.map(item => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      productSku: item.productSku,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      discount: item.discount,
      createdAt: item.createdAt
    })),
    subtotal: savedOrder.subtotal,
    taxAmount: savedOrder.taxAmount,
    shippingCost: savedOrder.shippingCost,
    discountAmount: savedOrder.discountAmount,
    totalAmount: savedOrder.totalAmount,
    shippingAddress: savedOrder.shippingAddress,
    billingAddress: savedOrder.billingAddress,
    notes: savedOrder.notes,
    createdAt: savedOrder.createdAt,
    updatedAt: savedOrder.updatedAt
  };
}
```

### Cambiar Estado de Pedido

```typescript
import { OrderStatus } from './models/enums';

async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  orderRepo: IOrderRepository
): Promise<void> {
  const order = await orderRepo.findById(orderId);
  if (!order) {
    throw new Error('Pedido no encontrado');
  }

  // Validar transiciones de estado
  switch (newStatus) {
    case OrderStatus.PROCESSING:
      if (order.status !== OrderStatus.PENDING) {
        throw new Error('Solo pedidos pendientes pueden pasar a procesamiento');
      }
      break;

    case OrderStatus.SHIPPED:
      if (order.status !== OrderStatus.PROCESSING) {
        throw new Error('Solo pedidos en procesamiento pueden enviarse');
      }
      order.markAsShipped();
      break;

    case OrderStatus.DELIVERED:
      if (order.status !== OrderStatus.SHIPPED) {
        throw new Error('Solo pedidos enviados pueden marcarse como entregados');
      }
      order.markAsDelivered();
      break;

    case OrderStatus.CANCELLED:
      if (!order.canBeCancelled()) {
        throw new Error('Este pedido no puede ser cancelado');
      }
      order.cancel();
      
      // Restaurar stock
      const items = await orderItemRepo.findByOrderId(orderId);
      for (const item of items) {
        await productRepo.increaseStock(item.productId, item.quantity);
      }
      break;

    default:
      order.status = newStatus;
      order.updatedAt = new Date();
  }

  await orderRepo.update(orderId, order);
}
```

---

## Sistema de Contacto

### Enviar Mensaje de Contacto

```typescript
import { Contact } from './models';
import { CreateContactDto, ContactResponseDto } from './dtos';
import { IContactRepository } from './repositories';

async function sendContactMessage(
  dto: CreateContactDto,
  contactRepo: IContactRepository
): Promise<ContactResponseDto> {
  // 1. Crear el mensaje
  const contact = new Contact({
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    subject: dto.subject,
    message: dto.message,
    userId: dto.userId
  });

  // 2. Guardar en la base de datos
  const savedContact = await contactRepo.create(contact);

  // 3. Enviar email de confirmación automática
  await sendConfirmationEmail(dto.email, dto.name);

  // 4. Notificar a admins de nuevo mensaje
  await notifyAdmins(savedContact);

  // 5. Retornar respuesta
  return {
    id: savedContact.id,
    name: savedContact.name,
    email: savedContact.email,
    phone: savedContact.phone,
    subject: savedContact.subject,
    message: savedContact.message,
    status: savedContact.status,
    userId: savedContact.userId,
    createdAt: savedContact.createdAt,
    respondedAt: savedContact.respondedAt,
    internalNotes: savedContact.internalNotes
  };
}
```

---

## Casos de Uso Completos

### Caso 1: Usuario Compra Producto

```typescript
async function completePurchaseFlow(
  userEmail: string,
  productId: string,
  quantity: number,
  shippingAddress: string
) {
  // 1. Login del usuario
  const authResponse = await login({
    email: userEmail,
    password: 'password123'
  });

  const userId = authResponse.user.id;

  // 2. Añadir producto al carrito
  await addToCart(
    { userId, productId, quantity },
    cartRepo,
    productRepo
  );

  // 3. Ver el carrito
  const cart = await getCart(userId, cartRepo, productRepo);
  console.log('Total a pagar:', cart.total);

  // 4. Crear pedido
  const order = await createOrderFromCart(
    {
      userId,
      items: [], // Se obtienen del carrito
      shippingAddress,
      billingAddress: shippingAddress,
      shippingCost: 5.99
    },
    orderRepo,
    orderItemRepo,
    cartRepo,
    productRepo
  );

  console.log('Pedido creado:', order.orderNumber);
  return order;
}
```

### Caso 2: Admin Gestiona Pedidos

```typescript
async function adminProcessOrders() {
  // 1. Obtener pedidos pendientes
  const pendingOrders = await orderRepo.getPendingOrders();
  
  for (const order of pendingOrders) {
    // 2. Cambiar a procesamiento
    await updateOrderStatus(
      order.id,
      OrderStatus.PROCESSING,
      orderRepo
    );

    // 3. Simular preparación del pedido
    console.log(`Procesando pedido ${order.orderNumber}...`);

    // 4. Marcar como enviado
    await updateOrderStatus(
      order.id,
      OrderStatus.SHIPPED,
      orderRepo
    );

    // 5. Enviar email de tracking
    await sendShippingNotification(order.userId, order.orderNumber);
  }
}
```

### Caso 3: Dashboard de Estadísticas

```typescript
async function getDashboardStats(
  productRepo: IProductRepository,
  orderRepo: IOrderRepository,
  userRepo: IUserRepository
) {
  // Obtener estadísticas en paralelo
  const [
    totalRevenue,
    totalOrders,
    totalUsers,
    bestSellers,
    recentOrders,
    ordersByStatus
  ] = await Promise.all([
    orderRepo.getTotalRevenue(),
    orderRepo.count(),
    userRepo.count(),
    productRepo.getBestSellers(5),
    orderRepo.getRecentOrders(10),
    orderRepo.getOrderStatsByStatus()
  ]);

  return {
    revenue: {
      total: totalRevenue,
      average: totalRevenue / totalOrders
    },
    orders: {
      total: totalOrders,
      byStatus: ordersByStatus,
      recent: recentOrders
    },
    users: {
      total: totalUsers
    },
    products: {
      bestSellers
    }
  };
}
```

---

## 🔧 Utilidades y Helpers

### Validador de DTOs

```typescript
function validateCreateProductDto(dto: CreateProductDto): string[] {
  const errors: string[] = [];

  if (!dto.name || dto.name.trim().length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres');
  }

  if (dto.price < 0) {
    errors.push('El precio debe ser mayor o igual a 0');
  }

  if (dto.stock < 0) {
    errors.push('El stock debe ser mayor o igual a 0');
  }

  if (!dto.categoryId) {
    errors.push('La categoría es obligatoria');
  }

  if (dto.features.length === 0) {
    errors.push('Debe incluir al menos una característica');
  }

  return errors;
}
```

### Mapper de Entidad a DTO

```typescript
function mapProductToResponseDto(
  product: Product,
  categoryName?: string
): ProductResponseDto {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    shortDescription: product.shortDescription,
    price: product.price,
    formattedPrice: product.getFormattedPrice('€'),
    stock: product.stock,
    isInStock: product.isInStock(),
    categoryId: product.categoryId,
    categoryName,
    imageUrl: product.imageUrl,
    icon: product.icon,
    color: product.color,
    features: product.features,
    isActive: product.isActive,
    isFeatured: product.isFeatured,
    sku: product.sku,
    weight: product.weight,
    tags: product.tags,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
}
```

---

**Nota**: Estos son ejemplos de referencia. La implementación real dependerá de tu framework backend (Express, NestJS, etc.) y ORM elegido (TypeORM, Prisma, etc.).
