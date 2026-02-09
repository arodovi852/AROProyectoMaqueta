package com.aroproyecto.seriesapi.dto;

import java.util.List;

/**
 * Paginated response wrapper
 */
public class PaginatedResponse<T> {
    
    private List<T> items;
    private long total;
    private int page;
    private int pageSize;

    public PaginatedResponse() {
    }

    public PaginatedResponse(List<T> items, long total, int page, int pageSize) {
        this.items = items;
        this.total = total;
        this.page = page;
        this.pageSize = pageSize;
    }

    public List<T> getItems() { return items; }
    public void setItems(List<T> items) { this.items = items; }
    public long getTotal() { return total; }
    public void setTotal(long total) { this.total = total; }
    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }
    public int getPageSize() { return pageSize; }
    public void setPageSize(int pageSize) { this.pageSize = pageSize; }

    public static <T> Builder<T> builder() { return new Builder<>(); }

    public static class Builder<T> {
        private List<T> items;
        private long total;
        private int page;
        private int pageSize;

        public Builder<T> items(List<T> items) { this.items = items; return this; }
        public Builder<T> total(long total) { this.total = total; return this; }
        public Builder<T> page(int page) { this.page = page; return this; }
        public Builder<T> pageSize(int pageSize) { this.pageSize = pageSize; return this; }

        public PaginatedResponse<T> build() {
            return new PaginatedResponse<>(items, total, page, pageSize);
        }
    }
}
