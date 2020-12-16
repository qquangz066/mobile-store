const fs = require('fs');
const path = require('path');

function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(path.resolve(__dirname, file));
  // convert binary data to base64 encoded string
  return `data:image/${path.extname(file).substr(1)};base64,` + new Buffer.from(bitmap).toString('base64');
}

exports.initDB = async function (app) {
  try {

    const user = await app.service('login').find({
      query: {
        email: 'admin@admin.com'
      }
    });

    if (user.total === 0) {
      // init users
      app.service('login').create(
        {
          name: 'admin',
          email: 'admin@admin.com',
          password: 'admin',
          role: 'admin'
        }
      );

      // init categories
      var phone_category = await app.service('admin/categories').create(
        {
          name: 'phone',
          text: 'Điện thoại'
        }
      );

      var accessories_category = await app.service('admin/categories').create(
        {
          name: 'accessories',
          text: 'Phụ kiện'
        }
      );

      // init brands
      var apple_brand = await app.service('admin/brands').create(
        {
          name: 'apple',
          text: 'Apple'
        }
      );
      var samsung_brand = await app.service('admin/brands').create(
        {
          name: 'samsung',
          text: 'Samsung'
        }
      );
      var oppo_brand = await app.service('admin/brands').create(
        {
          name: 'oppo',
          text: 'Oppo'
        }
      );
      var xiaomi_brand = await app.service('admin/brands').create(
        {
          name: 'xiaomi',
          text: 'Xiaomi'
        }
      );

      // init brands
      app.service('admin/products').create(
        {
          name: 'iPhone 11 128GB',
          category_id: phone_category._id,
          brand_id: apple_brand._id,
          specs: [
            {
              name: 'Màn hình',
              value: 'IPS LCD, 6.1", Liquid Retina'
            },
            {
              name: 'Hệ điều hành',
              value: 'iOS 13'
            },
            {
              name: 'Camera sau',
              value: '2 camera 12 MP'
            },
            {
              name: 'Camera trước',
              value: '12 MP'
            }
            , {
              name: 'CPU',
              value: 'Apple A13 Bionic 6 nhân'
            }, {
              name: 'RAM',
              value: '4 GB'
            },
            {
              name: 'Bộ nhớ trong',
              value: '128 GB'
            },
            {
              name: 'Thẻ SIM',
              value: '1 Nano SIM & 1 eSIM, Hỗ trợ 4G'
            },
            {
              name: 'Dung lượng pin',
              value: '3110 mAh, có sạc nhanh'
            }
          ],
          offers: [
            {
              name: 'Giảm giá 1,500,000đ'
            },
            {
              name: 'Pin sạc dự phòng giảm 30% khi mua kèm'
            }
          ],
          image: base64Encode('iphone-11-128-1.jpg'),
          gallery: [base64Encode('iphone-11-128-2.jpg'), base64Encode('iphone-11-128-3.jpg'), base64Encode('iphone-11-128-4.jpg')],
          price: 21990000,
          old_price: 0,
          quantity: 100,
        }
      );

      app.service('admin/products').create(
        {
          name: 'iPhone 12 Pro 512GB',
          category_id: phone_category._id,
          brand_id: apple_brand._id,
          specs: [
            {
              name: 'Màn hình',
              value: 'OLED, 6.1", Super Retina XDR'
            },
            {
              name: 'Hệ điều hành',
              value: 'iOS 14'
            },
            {
              name: 'Camera sau',
              value: '3 camera 12 MP'
            },
            {
              name: 'Camera trước',
              value: '12 MP'
            }
            , {
              name: 'CPU',
              value: 'Apple A14 Bionic 6 nhân'
            }, {
              name: 'RAM',
              value: '6 GB'
            },
            {
              name: 'Bộ nhớ trong',
              value: '512 GB'
            },
            {
              name: 'Thẻ SIM',
              value: '1 Nano SIM & 1 eSIM, Hỗ trợ 4G'
            },
            {
              name: 'Dung lượng pin',
              value: '3110 mAh, có sạc nhanh'
            }
          ],
          offers: [],
          image: base64Encode('iphone-12-pro-512gb.jpg'),
          gallery: [],
          price: 40990000,
          old_price: 0,
          quantity: 100,
        }
      );

      app.service('admin/products').create(
        {
          name: 'iPhone 12 mini 64GB',
          category_id: phone_category._id,
          brand_id: apple_brand._id,
          specs: [
            {
              name: 'Màn hình',
              value: 'OLED, 5.4", Super Retina XDR'
            },
            {
              name: 'Hệ điều hành',
              value: 'iOS 14'
            },
            {
              name: 'Camera sau',
              value: '2 camera 12 MP'
            },
            {
              name: 'Camera trước',
              value: '12 MP'
            }
            , {
              name: 'CPU',
              value: 'Apple A14 Bionic 6 nhân'
            }, {
              name: 'RAM',
              value: '4 GB'
            },
            {
              name: 'Bộ nhớ trong',
              value: '64 GB'
            },
            {
              name: 'Thẻ SIM',
              value: '1 Nano SIM & 1 eSIM, Hỗ trợ 4G'
            },
            {
              name: 'Dung lượng pin',
              value: '2227 mAh, có sạc nhanh'
            }
          ],
          offers: [],
          image: base64Encode('iphone-12-mini-blue.jpg'),
          gallery: [],
          price: 40990000,
          old_price: 0,
          quantity: 100,
        }
      );

      app.service('admin/products').create(
        {
          name: 'Samsung Galaxy Note 20 Ultra',
          category_id: phone_category._id,
          brand_id: samsung_brand._id,
          specs: [
            {
              name: 'Màn hình',
              value: 'Dynamic AMOLED 2X, 6.9", Quad HD+ (2K+)'
            },
            {
              name: 'Hệ điều hành',
              value: 'Android 10'
            },
            {
              name: 'Camera sau',
              value: 'Chính 108 MP & Phụ 12 MP, 12 MP, cảm biến Laser AF'
            },
            {
              name: 'Camera trước',
              value: '10 MP'
            }
            , {
              name: 'CPU',
              value: 'Exynos 990 8 nhân'
            }, {
              name: 'RAM',
              value: '8 GB'
            },
            {
              name: 'Bộ nhớ trong',
              value: '256 GB'
            },
            {
              name: 'Thẻ SIM',
              value: '2 Nano SIM hoặc 1 Nano SIM + 1 eSIM, Hỗ trợ 4G'
            },
            {
              name: 'Dung lượng pin',
              value: '4500 mAh, có sạc nhanh'
            }
          ],
          offers: [
            {
              name: 'Trả góp 0% thẻ tín dụng'
            },
            {
              name: 'Pin sạc dự phòng giảm 30% khi mua kèm'
            }
          ],
          image: base64Encode('samsung-galaxy-note-20-ultra.jpg'),
          gallery: [],
          price: 21990000,
          old_price: 0,
          quantity: 100,
        }
      );

      app.service('admin/products').create(
        {
          name: 'Samsung Galaxy S20 FE',
          category_id: phone_category._id,
          brand_id: samsung_brand._id,
          specs: [
            {
              name: 'Màn hình',
              value: 'Dynamic AMOLED 2X, 6.9", Quad HD+ (2K+)'
            },
            {
              name: 'Hệ điều hành',
              value: 'Android 10'
            },
            {
              name: 'Camera sau',
              value: 'Chính 108 MP & Phụ 12 MP, 12 MP, cảm biến Laser AF'
            },
            {
              name: 'Camera trước',
              value: '10 MP'
            }
            , {
              name: 'CPU',
              value: 'Exynos 990 8 nhân'
            }, {
              name: 'RAM',
              value: '8 GB'
            },
            {
              name: 'Bộ nhớ trong',
              value: '256 GB'
            },
            {
              name: 'Thẻ SIM',
              value: '2 Nano SIM hoặc 1 Nano SIM + 1 eSIM, Hỗ trợ 4G'
            },
            {
              name: 'Dung lượng pin',
              value: '4500 mAh, có sạc nhanh'
            }
          ],
          offers: [
            {
              name: 'Trả góp 0% thẻ tín dụng'
            },
            {
              name: 'Pin sạc dự phòng giảm 30% khi mua kèm'
            }
          ],
          image: base64Encode('samsung-galaxy-s20.jpg'),
          gallery: [],
          price: 15990000,
          old_price: 16000000,
          quantity: 100,
        }
      );

      app.service('admin/products').create(
        {
          name: 'Samsung Galaxy A11',
          category_id: phone_category._id,
          brand_id: samsung_brand._id,
          specs: [
            {
              name: 'Màn hình',
              value: 'Dynamic AMOLED 2X, 6.9", Quad HD+ (2K+)'
            },
            {
              name: 'Hệ điều hành',
              value: 'Android 10'
            },
            {
              name: 'Camera sau',
              value: 'Chính 108 MP & Phụ 12 MP, 12 MP, cảm biến Laser AF'
            },
            {
              name: 'Camera trước',
              value: '10 MP'
            }
            , {
              name: 'CPU',
              value: 'Exynos 990 8 nhân'
            }, {
              name: 'RAM',
              value: '8 GB'
            },
            {
              name: 'Bộ nhớ trong',
              value: '256 GB'
            },
            {
              name: 'Thẻ SIM',
              value: '2 Nano SIM hoặc 1 Nano SIM + 1 eSIM, Hỗ trợ 4G'
            },
            {
              name: 'Dung lượng pin',
              value: '4500 mAh, có sạc nhanh'
            }
          ],
          offers: [
            {
              name: 'Trả góp 0% thẻ tín dụng'
            },
            {
              name: 'Pin sạc dự phòng giảm 30% khi mua kèm'
            }
          ],
          image: base64Encode('samsung-galaxy-a11.jpg'),
          gallery: [],
          price: 3590000,
          old_price: 4590000,
          quantity: 100,
        }
      );

      app.service('admin/products').create(
        {
          name: 'Samsung Galaxy A11',
          category_id: phone_category._id,
          brand_id: samsung_brand._id,
          specs: [
            {
              name: 'Màn hình',
              value: 'Dynamic AMOLED 2X, 6.9", Quad HD+ (2K+)'
            },
            {
              name: 'Hệ điều hành',
              value: 'Android 10'
            },
            {
              name: 'Camera sau',
              value: 'Chính 108 MP & Phụ 12 MP, 12 MP, cảm biến Laser AF'
            },
            {
              name: 'Camera trước',
              value: '10 MP'
            }
            , {
              name: 'CPU',
              value: 'Exynos 990 8 nhân'
            }, {
              name: 'RAM',
              value: '8 GB'
            },
            {
              name: 'Bộ nhớ trong',
              value: '256 GB'
            },
            {
              name: 'Thẻ SIM',
              value: '2 Nano SIM hoặc 1 Nano SIM + 1 eSIM, Hỗ trợ 4G'
            },
            {
              name: 'Dung lượng pin',
              value: '4500 mAh, có sạc nhanh'
            }
          ],
          offers: [
            {
              name: 'Trả góp 0% thẻ tín dụng'
            },
            {
              name: 'Pin sạc dự phòng giảm 30% khi mua kèm'
            }
          ],
          image: base64Encode('samsung-galaxy-a11.jpg'),
          gallery: [],
          price: 3590000,
          old_price: 4590000,
          quantity: 100,
        }
      );
      app.service('admin/products').create(
        {
          name: 'Xiaomi Mi 10T Pro 5G',
          category_id: phone_category._id,
          brand_id: xiaomi_brand._id,
          specs: [
            {
              name: 'Màn hình',
              value: 'IPS LCD, 6.67", Full HD+'
            },
            {
              name: 'Hệ điều hành',
              value: 'Android 10'
            },
            {
              name: 'Camera sau',
              value: 'Chính 108 MP & Phụ 13 MP, 5 MP'
            },
            {
              name: 'Camera trước',
              value: '20 MP'
            }
            , {
              name: 'CPU',
              value: 'Snapdragon 865 8 nhân'
            }, {
              name: 'RAM',
              value: '8 GB'
            },
            {
              name: 'Bộ nhớ trong',
              value: '256 GB'
            },
            {
              name: 'Thẻ SIM',
              value: '2 Nano SIM, Hỗ trợ 5G'
            },
            {
              name: 'Dung lượng pin',
              value: '5000 mAh, có sạc nhanh'
            }
          ],
          offers: [
            {
              name: 'Bảo hành 24 tháng chính hãng '
            }
          ],
          image: base64Encode('xiaomi-mi-10t-pro.jpg'),
          gallery: [],
          price: 11990000,
          old_price: 12990000,
          quantity: 10,
        }
      );

    }

  } catch (e) {
    console.log(e);
  }
};
