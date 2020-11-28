const fs = require('fs');
const path = require('path');

function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(path.resolve(__dirname, file));
  // convert binary data to base64 encoded string
  return new Buffer.from(bitmap).toString('base64');
}

exports.initDB = async function (app) {
  try {

    const user = await app.service('users').find({
      query: {
        email: 'admin@admin.com'
      }
    });

    if (user.total === 0) {
      // init users
      app.service('users').create(
        {
          name: 'admin',
          email: 'admin@admin.com',
          password: 'admin',
          role: 'admin'
        }
      );

      // init categories
      var phone_category = await app.service('categories').create(
        {
          name: 'phone',
          text: 'Điện thoại'
        }
      );

      var accessories_category = await app.service('categories').create(
        {
          name: 'accessories',
          text: 'Phụ kiện'
        }
      );

      // init brands
      var apple_brand = await app.service('brands').create(
        {
          name: 'apple',
          text: 'Apple'
        }
      );
      var samsung_brand = await app.service('brands').create(
        {
          name: 'samsung',
          text: 'Samsung'
        }
      );
      var oppo_brand = await app.service('brands').create(
        {
          name: 'oppo',
          text: 'Oppo'
        }
      );
      var xiaomi_brand = await app.service('brands').create(
        {
          name: 'xiaomi',
          text: 'Xiaomi'
        }
      );

      // init brands
      app.service('products').create(
        {
          name: 'iPhone 11 128GB',
          category_id: phone_category._id,
          brand_id: apple_brand._id,
          description: [
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
          offer: [
            {
              name: 'Giảm giá 1,500,000đ'
            },
            {
              name: 'Pin sạc dự phòng giảm 30% khi mua kèm'
            }
          ],
          image: base64Encode('iphone-11-128-1.jpg'),
          gallery:[],
          price: 21990000,
          old_price: 0,
          quality: 100,
        }
      );

      app.service('products').create(
        {
          name: 'Samsung Galaxy Note 20 Ultra',
          category_id: phone_category._id,
          brand_id: samsung_brand._id,
          description: [
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
          offer: [
            {
              name: 'Trả góp 0% thẻ tín dụng'
            },
            {
              name: 'Pin sạc dự phòng giảm 30% khi mua kèm'
            }
          ],
          image: base64Encode('samsung-galaxy-note-20-ultra.jpg'),
          gallery:[],
          price: 21990000,
          old_price: 0,
          quality: 100,
        }
      );

      app.service('products').create(
        {
          name: 'Samsung Galaxy S20 FE',
          category_id: phone_category._id,
          brand_id: samsung_brand._id,
          description: [
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
          offer: [
            {
              name: 'Trả góp 0% thẻ tín dụng'
            },
            {
              name: 'Pin sạc dự phòng giảm 30% khi mua kèm'
            }
          ],
          image: base64Encode('samsung-galaxy-s20.jpg'),
          gallery:[],
          price: 15990000,
          old_price: 16000000,
          quality: 100,
        }
      );

      app.service('products').create(
        {
          name: 'Samsung Galaxy A11',
          category_id: phone_category._id,
          brand_id: samsung_brand._id,
          description: [
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
          offer: [
            {
              name: 'Trả góp 0% thẻ tín dụng'
            },
            {
              name: 'Pin sạc dự phòng giảm 30% khi mua kèm'
            }
          ],
          image: base64Encode('samsung-galaxy-a11.jpg'),
          gallery:[],
          price: 3590000,
          old_price: 4590000,
          quality: 100,
        }
      );
    }

  } catch (e) {
    console.log(e);
  }
};
