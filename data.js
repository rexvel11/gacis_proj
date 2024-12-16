const products = [
    {
        id: 1,
        name: "Air Max Classic",
        price: 6999,
        brand: "Nike",
        category: "Running",
        description: "Classic comfort meets modern style. Features advanced air cushioning and breathable mesh upper.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        sizes: [7, 8, 9, 10, 11],
        stocks: 330,
        color: "Red/White"
    },
    {
        id: 2,
        name: "Runner Pro",
        price: 8499,
        brand: "Adidas",
        category: "Running",
        description: "Professional grade running shoes with responsive cushioning and lightweight design.",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
        sizes: [7, 8, 9, 10, 11, 12],
        stocks: 430,
        color: "Blue/Black"
    },
    {
        id: 3,
        name: "Urban Street",
        price: 4999,
        brand: "Puma",
        category: "Casual",
        description: "Casual streetwear sneakers perfect for everyday use. Stylish and comfortable.",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
        sizes: [6, 7, 8, 9, 10],
        stocks: 280,
        color: "White/Gray"
    },
    {
        id: 4,
        name: "Sport Elite",
        price: 9999,
        brand: "Nike",
        category: "Basketball",
        description: "High-performance athletic shoes designed for serious athletes.",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
        sizes: [8, 9, 10, 11, 12],
        stocks: 530,
        color: "Black/Red"
    },
    {
        id: 5,
        name: "Comfort Walk",
        price: 3999,
        brand: "Adidas",
        category: "Casual",
        description: "Ultimate comfort for long walks and daily wear. Memory foam insole.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
        sizes: [7, 8, 9, 10],
        stocks: 490,
        color: "Gray/White"
    }
];

const brands = [...new Set(products.map(p => p.brand))];
const categories = [...new Set(products.map(p => p.category))];