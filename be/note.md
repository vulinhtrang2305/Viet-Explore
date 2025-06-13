### Các key trong mongoDb

- Collection trong mongoDb , mặc định các bảng table sẽ tự sinh versionKey (ký hiệu trong dtb: \_\_v )
  => Khi tạo dtb mà trong bảng ko có versionKey (\_\_v) => model phải loại bỏ nó đi
- Mặc định nó sẽ tự tạo createdAt, updatedAt
  => khi mà dtb ko có 2 cái trên thì cũng phải hủy nó đi
