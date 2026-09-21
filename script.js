    function addToCart(product) {

        const cart =
            getCart();

        const products =
            ensureProducts();

        const currentProduct =
            products[product.id];

        // Ислоҳ барои пешгирии undefined ва NaN:
        const productName =
            product.name ||
            (currentProduct && currentProduct.name) ||
            product.id ||
            "Маҳсулот";

        const productPrice =
            Number(product.price) ||
            (currentProduct && Number(currentProduct.price)) ||
            0;

        const productUnit =
            product.unit ||
            (currentProduct && currentProduct.unit) ||
            "кг";

        const stock =
            currentProduct
                ? Number(currentProduct.qty) || 0
                : Number(product.stock) || 0;


        const existing =
            cart.find(
                item =>
                    item.id === product.id
            );


        if (existing) {

            if (
                Number(existing.qty) >=
                stock
            ) {

                alert(
                    t("noStock")
                );

                return;

            }


            existing.qty += 1;

        } else {

            if (stock <= 0) {

                alert(
                    t("noStock")
                );

                return;

            }


            cart.push({

                id: product.id,

                name: productName,

                price: productPrice,

                unit: productUnit,

                qty: 1

            });

        }


        saveCart(cart);

        updateCart();

    }
