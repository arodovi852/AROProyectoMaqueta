# Backend - Estructura de Datos

Este directorio contiene el diseño completo del backend de la aplicación **BROADCASTTD**, incluyendo modelos de entidades, DTOs y repositorios.

## 📁 Estructura de Carpetas

```
src/backend/
├── models/          # Entidades del dominio
├── dtos/            # Data Transfer Objects
└── repositories/    # Interfaces de repositorios con consultas
```

## 📊 Diagrama Entidad-Relación

El diagrama E/R completo se encuentra en [docs/design/DATABASE_DESIGN.md](../../docs/design/DATABASE_DESIGN.md)

### Entidades Principales

1. **USER** - Usuarios del sistema
2. **CATEGORY** - Categorías de productos (con jerarquía)
3. **PRODUCT** - Catálogo de productos
4. **ORDER** - Pedidos realizados
5. **ORDER_ITEM** - Items individuales de cada pedido
6. **CART_ITEM** - Items en el carrito de compras
7. **CONTACT** - Mensajes de contacto

## 🏗️ Modelos (Entities)

Los modelos representan las entidades de negocio con su lógica de dominio.

### Archivos de Modelos

- [`user.model.ts`](./models/user.model.ts) - Gestión de usuarios
- [`category.model.ts`](./models/category.model.ts) - Categorías con jerarquía
- [`product.model.ts`](./models/product.model.ts) - Productos del catálogo
- [`order.model.ts`](./models/order.model.ts) - Pedidos
- [`order-item.model.ts`](./models/order-item.model.ts) - Items de pedidos
- [`cart-item.model.ts`](./models/cart-item.model.ts) - Items del carrito
- [`contact.model.ts`](./models/contact.model.ts) - Mensajes de contacto
- [`enums.ts`](./models/enums.ts) - Enumeraciones (UserRole, OrderStatus, ContactStatus)

### Características de los Modelos

- ✅ Validaciones de negocio
- ✅ Métodos de utilidad
- ✅ Propiedades calculadas
- ✅ Documentación completa con JSDoc
- ✅ Constructores con valores por defecto

### Ejemplo de Uso

```typescript
import { Product, Category } from './models';

// Crear un producto
const product = new Product({
  name: 'Cloud Enterprise',
  price: 999.99,
  stock: 50,
  categoryId: 'cat-123',
  features: ['Escalabilidad', 'Alta disponibilidad']
});

// Verificar stock
if (product.isInStock()) {
  product.reduceStock(5);
}

console.log(product.getFormattedPrice()); // "999.99€"
```

## 📦 DTOs (Data Transfer Objects)

Los DTOs definen la estructura de datos para la comunicación entre frontend y backend.

### Archivos de DTOs

- [`user.dto.ts`](./dtos/user.dto.ts) - DTOs de usuarios y autenticación
- [`category.dto.ts`](./dtos/category.dto.ts) - DTOs de categorías
- [`product.dto.ts`](./dtos/product.dto.ts) - DTOs de productos con filtros y paginación
- [`order.dto.ts`](./dtos/order.dto.ts) - DTOs de pedidos y estadísticas
- [`cart.dto.ts`](./dtos/cart.dto.ts) - DTOs del carrito de compras
- [`contact.dto.ts`](./dtos/contact.dto.ts) - DTOs de mensajes de contacto
- [`common.dto.ts`](./dtos/common.dto.ts) - DTOs genéricos y reutilizables

### Tipos de DTOs

#### 1. DTOs de Creación (Create)
Para crear nuevas entidades con validaciones específicas.

```typescript
interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  // ...
}
```

#### 2. DTOs de Actualización (Update)
Con campos opcionales para actualizaciones parciales.

```typescript
interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  // ...
}
```

#### 3. DTOs de Respuesta (Response)
Datos que se envían al frontend, sin información sensible.

```typescript
interface ProductResponseDto {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  isInStock: boolean;
  // ...
}
```

#### 4. DTOs de Filtro (Filter)
Para búsquedas y filtrados avanzados.

```typescript
interface ProductFilterDto {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  page?: number;
  limit?: number;
}
```

#### 5. DTOs de Paginación
Para respuestas paginadas.

```typescript
interface ProductPageResponseDto {
  products: ProductListItemDto[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
}
```

## 🗄️ Repositorios

Los repositorios definen las interfaces para el acceso a datos con consultas personalizadas.

### Archivos de Repositorios

- [`user.repository.ts`](./repositories/user.repository.ts)
- [`category.repository.ts`](./repositories/category.repository.ts)
- [`product.repository.ts`](./repositories/product.repository.ts)
- [`order.repository.ts`](./repositories/order.repository.ts)
- [`order-item.repository.ts`](./repositories/order-item.repository.ts)
- [`cart-item.repository.ts`](./repositories/cart-item.repository.ts)
- [`contact.repository.ts`](./repositories/contact.repository.ts)

### Operaciones Estándar (CRUD)

Todos los repositorios incluyen:

```typescript
interface IRepository<T> {
  create(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
```

### Consultas Personalizadas

Cada repositorio incluye consultas específicas del dominio:

#### UserRepository
- `findByEmail()` - Buscar por email
- `findByRole()` - Filtrar por rol
- `verifyCredentials()` - Autenticación
- `searchByName()` - Búsqueda por nombre
- `findWithPagination()` - Paginación

#### ProductRepository
- `findByCategoryId()` - Productos por categoría
- `findFeaturedProducts()` - Productos destacados
- `findByPriceRange()` - Filtrar por precio
- `searchFullText()` - Búsqueda de texto completo
- `getBestSellers()` - Más vendidos
- `findLowStockProducts()` - Stock bajo
- `updateStock()` - Gestión de inventario

#### OrderRepository
- `findByUserId()` - Pedidos de un usuario
- `findByStatus()` - Filtrar por estado
- `getTotalRevenue()` - Ingresos totales
- `getOrderStatsByStatus()` - Estadísticas
- `getMonthlySalesStats()` - Ventas mensuales
- `getTopCustomers()` - Mejores clientes

#### CategoryRepository
- `findBySlug()` - Buscar por slug
- `getCategoryTree()` - Árbol de categorías
- `findByParentId()` - Subcategorías
- `getCategoryPath()` - Breadcrumb
- `getTopCategoriesByProducts()` - Más populares

#### CartItemRepository
- `findByUserId()` - Carrito de un usuario
- `getCartWithProductDetails()` - Carrito con detalles
- `calculateCartTotal()` - Total del carrito
- `removeInvalidItems()` - Limpiar items inválidos
- `mergeCarts()` - Fusionar carritos

#### ContactRepository
- `findByStatus()` - Filtrar por estado
- `searchMessages()` - Búsqueda de texto
- `getAverageResponseTime()` - Tiempo de respuesta
- `getMessagesNeedingAttention()` - Mensajes urgentes
- `getFrequentContacts()` - Contactos frecuentes

## 🔄 Flujo de Datos

```
┌──────────────┐
│   Frontend   │
└──────┬───────┘
       │ HTTP Request (DTO)
       ▼
┌──────────────┐
│  API Layer   │
└──────┬───────┘
       │ Valida DTO
       ▼
┌──────────────┐
│   Service    │
└──────┬───────┘
       │ Lógica de negocio
       ▼
┌──────────────┐
│  Repository  │ ◄──── Interfaces definidas aquí
└──────┬───────┘
       │ Consultas
       ▼
┌──────────────┐
│   Database   │
└──────────────┘
```

## 📝 Convenciones y Buenas Prácticas

### Nomenclatura

- **Modelos**: `PascalCase` con sufijo `.model.ts`
  - Ejemplo: `User`, `Product`, `OrderItem`

- **DTOs**: `PascalCase` con sufijo descriptivo + `Dto`
  - Ejemplo: `CreateUserDto`, `ProductResponseDto`, `OrderFilterDto`

- **Repositorios**: Interfaz con prefijo `I` + `PascalCase` + `Repository`
  - Ejemplo: `IUserRepository`, `IProductRepository`

### Validaciones

Las validaciones se realizan en múltiples capas:

1. **DTOs**: Validación de estructura y tipos
2. **Modelos**: Validación de reglas de negocio
3. **Repositorios**: Validación de integridad de datos

### Enumeraciones

Los enums están centralizados en [`models/enums.ts`](./models/enums.ts):

```typescript
enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  GUEST = 'guest'
}

enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

enum ContactStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}
```

## 🚀 Próximos Pasos (Fases Avanzadas)

### Implementación de Repositorios

Cuando implementes los repositorios con una base de datos real:

1. **PostgreSQL / MySQL**: Usa TypeORM o Prisma
2. **MongoDB**: Usa Mongoose
3. **In-Memory**: Implementación simple para testing

### Ejemplo con TypeORM

```typescript
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { IUserRepository } from './user.repository';

export class UserRepositoryImpl implements IUserRepository {
  constructor(private ormRepository: Repository<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  // ... resto de métodos
}
```

### Servicios de Negocio

Crea servicios que usen los repositorios:

```typescript
export class ProductService {
  constructor(
    private productRepo: IProductRepository,
    private categoryRepo: ICategoryRepository
  ) {}

  async getProductsWithCategory(filters: ProductFilterDto) {
    const products = await this.productRepo.findWithFilters(filters);
    // Lógica adicional...
    return products;
  }
}
```

### API REST

Endpoints sugeridos:

```
# Usuarios
POST   /api/users/register
POST   /api/users/login
GET    /api/users/:id
PUT    /api/users/:id
GET    /api/users

# Productos
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
GET    /api/products/featured
GET    /api/products/search?q=...

# Categorías
GET    /api/categories
GET    /api/categories/:id
GET    /api/categories/tree

# Pedidos
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id/status

# Carrito
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:id
DELETE /api/cart/items/:id
DELETE /api/cart

# Contacto
POST   /api/contact
GET    /api/contact (admin)
PUT    /api/contact/:id/status (admin)
```

## 📚 Recursos Adicionales

- [Documentación completa de la BD](../../docs/design/DATABASE_DESIGN.md)
- [Requisitos del proyecto](../../docs/requisitos/)
- [Documentación de diseño](../../docs/design/DOCUMENTACION.md)

## 🔐 Consideraciones de Seguridad

- ✅ Las contraseñas se hashean con bcrypt
- ✅ Los DTOs de respuesta no incluyen información sensible
- ✅ Validación de permisos en cada operación
- ✅ Prevención de SQL Injection mediante parametrización
- ✅ Rate limiting en endpoints sensibles (login, registro)

## 📊 Métricas y Monitoring

Los repositorios incluyen métodos para obtener estadísticas:

- Total de registros por entidad
- Estadísticas de ventas
- Tiempo promedio de respuesta
- Items más populares
- Análisis de comportamiento de usuarios

---

**Nota**: Este diseño es inicial y puede evolucionar según las necesidades del proyecto en fases avanzadas.
