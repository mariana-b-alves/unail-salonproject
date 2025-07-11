export const fixImagePath = (imgPath) => {
    const link = import.meta.env.BASE_URL || '/';
    if (imgPath.startsWith('../img/')) {
        return link + 'img/' + imgPath.replace('../img/', '');
    }
    return imgPath;
};

export async function loadProductData() {
    /*FETCH DATA FROM "../js/data/productData.json" SO IT CAN BE USED IN MULTIPLE PARTS OF THE APP*/
    const data = await fetch('./js/data/productData.json');
    window.productData = await data.json();
};
