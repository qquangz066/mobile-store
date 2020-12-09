import productService from "@/services/product";
import productAdminService from "@/services/admin_product";
import categoryService from "@/services/category";
import brandService from "@/services/brand";

export default {
    product: productService,
    category: categoryService,
    brand: brandService,
    admin: {
        product: productAdminService
    }
}