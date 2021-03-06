import productService from "@/services/product";
import productAdminService from "@/services/admin_product";
import categoryService from "@/services/category";
import brandService from "@/services/brand";
import brandAdminService from "@/services/admin_brand";
import userAdminService from "@/services/admin_user";
import categoryAdminService from "@/services/admin_category";
import orderAdminService from "@/services/admin_order";
import auth from "@/services/auth";
import orderService from "@/services/order";

export default {
    auth: auth,
    product: productService,
    category: categoryService,
    brand: brandService,
    order: orderService,
    admin: {
        product: productAdminService,
        brand: brandAdminService,
        category: categoryAdminService,
        user: userAdminService,
        order: orderAdminService
    }
}