# Diagrama E/R Visual - BROADCASTTD

Este archivo contiene el diagrama entidad-relación en formato Mermaid para visualización en GitHub y editores compatibles.

## Diagrama Completo

```mermaid
erDiagram
    USER ||--o{ ORDER : "places"
    USER ||--o{ CART_ITEM : "has"
    ORDER ||--|{ ORDER_ITEM : "contains"
    PRODUCT ||--o{ ORDER_ITEM : "ordered_in"
    PRODUCT ||--o{ CART_ITEM : "in_cart"
    CATEGORY ||--o{ PRODUCT : "categorizes"
    CATEGORY ||--o{ CATEGORY : "parent_of"

    USER {
        uuid id PK
        string email UK
        string password
        string firstName
        string lastName
        string phone
        enum role
        boolean isActive
        timestamp createdAt
        timestamp updatedAt
    }

    CATEGORY {
        uuid id PK
        string name
        text description
        string slug UK
        uuid parentId FK
        boolean isActive
        int displayOrder
        timestamp createdAt
        timestamp updatedAt
    }

    PRODUCT {
        uuid id PK
        string name
        text description
        string shortDescription
        decimal price
        int stock
        uuid categoryId FK
        string imageUrl
        string icon
        string color
        json features
        boolean isActive
        boolean isFeatured
        string sku UK
        int weight
        json tags
        timestamp createdAt
        timestamp updatedAt
    }

    ORDER {
        uuid id PK
        uuid userId FK
        string orderNumber UK
        enum status
        decimal totalAmount
        decimal subtotal
        decimal taxAmount
        decimal shippingCost
        decimal discountAmount
        text shippingAddress
        text billingAddress
        text notes
        timestamp createdAt
        timestamp updatedAt
        timestamp shippedAt
        timestamp deliveredAt
        timestamp cancelledAt
    }

    ORDER_ITEM {
        uuid id PK
        uuid orderId FK
        uuid productId FK
        string productName
        string productSku
        int quantity
        decimal unitPrice
        decimal totalPrice
        decimal discount
        timestamp createdAt
    }

    CART_ITEM {
        uuid id PK
        uuid userId FK
        uuid productId FK
        int quantity
        timestamp createdAt
        timestamp updatedAt
    }

    CONTACT {
        uuid id PK
        string name
        string email
        string phone
        string subject
        text message
        enum status
        uuid userId FK
        timestamp createdAt
        timestamp respondedAt
        text internalNotes
    }
```

## Diagrama Simplificado (Solo Relaciones Principales)

```mermaid
erDiagram
    USER ||--o{ ORDER : "1:N"
    USER ||--o{ CART_ITEM : "1:N"
    ORDER ||--|{ ORDER_ITEM : "1:N"
    PRODUCT ||--o{ ORDER_ITEM : "1:N"
    PRODUCT ||--o{ CART_ITEM : "1:N"
    CATEGORY ||--o{ PRODUCT : "1:N"
    CATEGORY ||--o{ CATEGORY : "parent-child"

    USER {
        uuid id
        string email
        enum role
    }

    CATEGORY {
        uuid id
        string name
        uuid parentId
    }

    PRODUCT {
        uuid id
        string name
        decimal price
        int stock
        uuid categoryId
    }

    ORDER {
        uuid id
        uuid userId
        string orderNumber
        enum status
        decimal totalAmount
    }

    ORDER_ITEM {
        uuid id
        uuid orderId
        uuid productId
        int quantity
        decimal unitPrice
    }

    CART_ITEM {
        uuid id
        uuid userId
        uuid productId
        int quantity
    }

    CONTACT {
        uuid id
        string email
        enum status
    }
```

## Vista por Módulos

### Módulo de Usuarios y Autenticación

```mermaid
erDiagram
    USER {
        uuid id PK
        string email UK "Único, para login"
        string password "Hash bcrypt"
        string firstName
        string lastName
        string phone
        enum role "admin, customer, guest"
        boolean isActive "Cuenta activa/suspendida"
        timestamp createdAt
        timestamp updatedAt
    }
```

**Roles**:
- `ADMIN`: Administrador del sistema
- `CUSTOMER`: Cliente registrado
- `GUEST`: Usuario invitado (temporal)

### Módulo de Catálogo

```mermaid
erDiagram
    CATEGORY ||--o{ PRODUCT : "has"
    CATEGORY ||--o{ CATEGORY : "parent_of"

    CATEGORY {
        uuid id PK
        string name "Nombre visible"
        text description
        string slug UK "URL amigable"
        uuid parentId FK "Categoría padre (null = raíz)"
        boolean isActive
        int displayOrder "Orden de visualización"
        timestamp createdAt
        timestamp updatedAt
    }

    PRODUCT {
        uuid id PK
        string name
        text description
        string shortDescription "Para listados"
        decimal price "Precio actual"
        int stock "Inventario disponible"
        uuid categoryId FK
        string imageUrl "URL imagen principal"
        string icon "SVG del producto"
        string color "Color asociado"
        json features "Lista de características"
        boolean isActive "Visible en catálogo"
        boolean isFeatured "Producto destacado"
        string sku UK "Stock Keeping Unit"
        int weight "Peso en gramos"
        json tags "Etiquetas para búsqueda"
        timestamp createdAt
        timestamp updatedAt
    }
```

**Jerarquía de Categorías**:
```
Cloud Computing (raíz)
├── IaaS (parentId: Cloud Computing)
├── PaaS (parentId: Cloud Computing)
└── SaaS (parentId: Cloud Computing)
```

### Módulo de Carrito

```mermaid
erDiagram
    USER ||--o{ CART_ITEM : "has"
    PRODUCT ||--o{ CART_ITEM : "in"

    USER {
        uuid id PK
    }

    PRODUCT {
        uuid id PK
        decimal price
        int stock
    }

    CART_ITEM {
        uuid id PK
        uuid userId FK "Dueño del carrito"
        uuid productId FK "Producto en carrito"
        int quantity "Cantidad solicitada"
        timestamp createdAt "Añadido al carrito"
        timestamp updatedAt "Última modificación"
    }
```

**Restricción Única**: `(userId, productId)` - Un usuario no puede tener el mismo producto duplicado en el carrito.

### Módulo de Pedidos

```mermaid
erDiagram
    USER ||--o{ ORDER : "places"
    ORDER ||--|{ ORDER_ITEM : "contains"
    PRODUCT ||--o{ ORDER_ITEM : "in"

    USER {
        uuid id PK
    }

    ORDER {
        uuid id PK
        uuid userId FK "Cliente que realizó el pedido"
        string orderNumber UK "Número único de pedido"
        enum status "Estado actual"
        decimal totalAmount "Total a pagar"
        decimal subtotal "Suma de items"
        decimal taxAmount "Impuestos"
        decimal shippingCost "Coste de envío"
        decimal discountAmount "Descuento aplicado"
        text shippingAddress "Dirección de entrega"
        text billingAddress "Dirección de facturación"
        text notes "Notas del cliente"
        timestamp createdAt
        timestamp updatedAt
        timestamp shippedAt "Fecha de envío"
        timestamp deliveredAt "Fecha de entrega"
        timestamp cancelledAt "Fecha de cancelación"
    }

    ORDER_ITEM {
        uuid id PK
        uuid orderId FK
        uuid productId FK "Snapshot del producto"
        string productName "Nombre al momento del pedido"
        string productSku "SKU al momento del pedido"
        int quantity "Cantidad pedida"
        decimal unitPrice "Precio unitario al momento"
        decimal totalPrice "unitPrice x quantity"
        decimal discount "Descuento por item"
        timestamp createdAt
    }

    PRODUCT {
        uuid id PK
    }
```

**Estados del Pedido**:
1. `PENDING` - Pendiente de pago/confirmación
2. `PROCESSING` - En proceso de preparación
3. `SHIPPED` - Enviado
4. `DELIVERED` - Entregado
5. `CANCELLED` - Cancelado
6. `REFUNDED` - Reembolsado

**Flujo de Estado**:
```
PENDING → PROCESSING → SHIPPED → DELIVERED
    ↓           ↓
CANCELLED   CANCELLED
    ↓
REFUNDED
```

### Módulo de Contacto

```mermaid
erDiagram
    CONTACT {
        uuid id PK
        string name "Nombre del remitente"
        string email "Email de contacto"
        string phone "Teléfono (opcional)"
        string subject "Asunto del mensaje"
        text message "Mensaje completo"
        enum status "Estado del ticket"
        uuid userId FK "Usuario registrado (opcional)"
        timestamp createdAt "Fecha de envío"
        timestamp respondedAt "Fecha de respuesta"
        text internalNotes "Notas internas (admin)"
    }
```

**Estados del Mensaje**:
1. `NEW` - Nuevo, sin leer
2. `IN_PROGRESS` - En revisión
3. `RESOLVED` - Resuelto
4. `CLOSED` - Cerrado

## Índices Principales

### Índices para Performance

```sql
-- USER
CREATE INDEX idx_user_email ON USER(email);
CREATE INDEX idx_user_role ON USER(role);

-- CATEGORY
CREATE UNIQUE INDEX idx_category_slug ON CATEGORY(slug);
CREATE INDEX idx_category_parent ON CATEGORY(parentId);
CREATE INDEX idx_category_active ON CATEGORY(isActive);

-- PRODUCT
CREATE UNIQUE INDEX idx_product_sku ON PRODUCT(sku);
CREATE INDEX idx_product_category ON PRODUCT(categoryId);
CREATE INDEX idx_product_active ON PRODUCT(isActive);
CREATE INDEX idx_product_featured ON PRODUCT(isFeatured);
CREATE INDEX idx_product_name ON PRODUCT(name); -- Para búsquedas

-- ORDER
CREATE UNIQUE INDEX idx_order_number ON ORDER(orderNumber);
CREATE INDEX idx_order_user ON ORDER(userId);
CREATE INDEX idx_order_status ON ORDER(status);
CREATE INDEX idx_order_created ON ORDER(createdAt);

-- ORDER_ITEM
CREATE INDEX idx_orderitem_order ON ORDER_ITEM(orderId);
CREATE INDEX idx_orderitem_product ON ORDER_ITEM(productId);

-- CART_ITEM
CREATE INDEX idx_cart_user ON CART_ITEM(userId);
CREATE INDEX idx_cart_product ON CART_ITEM(productId);
CREATE UNIQUE INDEX idx_cart_user_product ON CART_ITEM(userId, productId);

-- CONTACT
CREATE INDEX idx_contact_status ON CONTACT(status);
CREATE INDEX idx_contact_email ON CONTACT(email);
CREATE INDEX idx_contact_created ON CONTACT(createdAt);
```

## Restricciones de Integridad

### Foreign Keys con Políticas

```sql
-- ORDER
ALTER TABLE ORDER
  ADD CONSTRAINT fk_order_user
  FOREIGN KEY (userId) REFERENCES USER(id)
  ON DELETE CASCADE; -- Si se elimina el usuario, se eliminan sus pedidos

-- ORDER_ITEM
ALTER TABLE ORDER_ITEM
  ADD CONSTRAINT fk_orderitem_order
  FOREIGN KEY (orderId) REFERENCES ORDER(id)
  ON DELETE CASCADE; -- Si se elimina el pedido, se eliminan sus items

ALTER TABLE ORDER_ITEM
  ADD CONSTRAINT fk_orderitem_product
  FOREIGN KEY (productId) REFERENCES PRODUCT(id)
  ON DELETE RESTRICT; -- No permitir eliminar productos con pedidos

-- PRODUCT
ALTER TABLE PRODUCT
  ADD CONSTRAINT fk_product_category
  FOREIGN KEY (categoryId) REFERENCES CATEGORY(id)
  ON DELETE SET NULL; -- Si se elimina la categoría, productos quedan sin categoría

-- CATEGORY (auto-referencia)
ALTER TABLE CATEGORY
  ADD CONSTRAINT fk_category_parent
  FOREIGN KEY (parentId) REFERENCES CATEGORY(id)
  ON DELETE SET NULL; -- Si se elimina padre, hijos se convierten en raíz

-- CART_ITEM
ALTER TABLE CART_ITEM
  ADD CONSTRAINT fk_cart_user
  FOREIGN KEY (userId) REFERENCES USER(id)
  ON DELETE CASCADE; -- Si se elimina usuario, se elimina su carrito

ALTER TABLE CART_ITEM
  ADD CONSTRAINT fk_cart_product
  FOREIGN KEY (productId) REFERENCES PRODUCT(id)
  ON DELETE CASCADE; -- Si se elimina producto, se elimina del carrito
```

### Checks de Validación

```sql
-- USER
ALTER TABLE USER ADD CONSTRAINT chk_user_email CHECK (email LIKE '%@%');
ALTER TABLE USER ADD CONSTRAINT chk_user_password CHECK (LENGTH(password) >= 8);

-- PRODUCT
ALTER TABLE PRODUCT ADD CONSTRAINT chk_product_price CHECK (price >= 0);
ALTER TABLE PRODUCT ADD CONSTRAINT chk_product_stock CHECK (stock >= 0);

-- ORDER
ALTER TABLE ORDER ADD CONSTRAINT chk_order_amounts CHECK (totalAmount >= 0);

-- ORDER_ITEM
ALTER TABLE ORDER_ITEM ADD CONSTRAINT chk_orderitem_quantity CHECK (quantity > 0);
ALTER TABLE ORDER_ITEM ADD CONSTRAINT chk_orderitem_prices CHECK (unitPrice >= 0 AND totalPrice >= 0);

-- CART_ITEM
ALTER TABLE CART_ITEM ADD CONSTRAINT chk_cart_quantity CHECK (quantity > 0);
```

## Visualización en Herramientas

Para visualizar este diagrama:

1. **GitHub**: Renderiza automáticamente bloques Mermaid
2. **VS Code**: Instala la extensión "Markdown Preview Mermaid Support"
3. **Online**: Usa [mermaid.live](https://mermaid.live)
4. **Draw.io**: Importa como texto
5. **DbDiagram.io**: Convierte a su sintaxis

## Exportar a Otros Formatos

### SQL Create Tables (Ejemplo PostgreSQL)

Ver archivo completo en: `docs/database/schema.sql` (a crear en fase de implementación)

### TypeORM Entities

Las entidades TypeScript en `src/backend/models/` pueden convertirse directamente a entidades TypeORM añadiendo decoradores:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // ... resto de campos con decoradores
}
```

---

**Nota**: Este diagrama visual complementa la documentación textual en [DATABASE_DESIGN.md](./DATABASE_DESIGN.md)
