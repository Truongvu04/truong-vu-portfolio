# Portfolio Trường Vũ

Trang có nút chuyển VI/EN ở đầu trang. Nội dung hai ngôn ngữ nằm trong [`src/content.ts`](src/content.ts); lựa chọn ngôn ngữ được lưu trong trình duyệt.

Chạy tại máy:

```bash
npm install
npm run dev
```

## Cập nhật ảnh và website của dự án

Mở [`src/data/projects.ts`](src/data/projects.ts). Mỗi dự án có danh sách `images` và, nếu đã triển khai, một `liveUrl`:

```ts
{
  name: 'Tên dự án',
  category: 'Loại dự án',
  description: 'Mô tả ngắn',
  images: [
    'https://example.com/anh-1.webp',
    'https://example.com/anh-2.webp',
    'https://example.com/anh-3.webp',
  ],
  liveUrl: 'https://example.com',
}
```

Ảnh có thể là URL đầy đủ hoặc đường dẫn trong thư mục `public` (ví dụ `/images/du-an-1.webp`). Ba ảnh đầu xuất hiện trên thẻ dự án; mọi ảnh trong danh sách đều xem được ở chế độ phóng lớn. Nếu website chưa deploy, bỏ `liveUrl`; khách vẫn có thể xem ảnh và thẻ sẽ hiện “Chưa có bản chạy”.

Các ảnh trong `public/previews` hiện là **minh họa tạm**, không phải ảnh chụp website. Hãy thay chúng bằng ảnh dự án thật khi có.
