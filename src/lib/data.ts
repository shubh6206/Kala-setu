export type Artisan = {
    id: string;
    name: string;
    craft: string;
    location: string;
    story: string;
    avatarImageId: string;
    products: {
        id: string;
        name: string;
        imageId: string;
        price: number;
    }[];
};

export const artisans: Artisan[] = [
    {
        id: '1',
        name: 'Rajesh Kumar',
        craft: 'Terracotta Pottery',
        location: 'Jaipur, Rajasthan',
        story: 'Rajesh Kumar inherited the art of terracotta pottery from his father. For over 30 years, he has been shaping clay into beautiful pots, lamps, and decorative items, each piece telling a story of the vibrant culture of Rajasthan.',
        avatarImageId: 'artisan-portrait-1',
        products: [
            { id: 'p1-1', name: 'Hand-painted Vase', imageId: 'handicraft-2', price: 45 },
            { id: 'p1-2', name: 'Designer Diya Set', imageId: 'handicraft-2', price: 25 },
            { id: 'p1-3', name: 'Terracotta Elephant', imageId: 'handicraft-2', price: 60 },
        ],
    },
    {
        id: '2',
        name: 'Meena Devi',
        craft: 'Madhubani Painting',
        location: 'Madhubani, Bihar',
        story: 'Meena Devi is a master of Madhubani painting, a folk art form that originates from her village. Her paintings, characterized by intricate lines and vibrant colors, depict mythological tales and scenes from nature.',
        avatarImageId: 'artisan-portrait-2',
        products: [
            { id: 'p2-1', name: 'Tree of Life', imageId: 'handicraft-1', price: 120 },
            { id: 'p2-2', name: 'Fish Motif Painting', imageId: 'handicraft-1', price: 80 },
        ],
    },
    {
        id: '3',
        name: 'Ibrahim Khan',
        craft: 'Channapatna Toys',
        location: 'Channapatna, Karnataka',
        story: "Ibrahim Khan is a fourth-generation toymaker from Channapatna, the 'toy town' of Karnataka. He uses traditional techniques and natural dyes to create safe, eco-friendly wooden toys that have delighted children for centuries.",
        avatarImageId: 'artisan-portrait-3',
        products: [
            { id: 'p3-1', name: 'Wooden Stacking Rings', imageId: 'handicraft-3', price: 30 },
            { id: 'p3-2', name: 'Colorful Spinning Top', imageId: 'handicraft-3', price: 15 },
            { id: 'p3-3', name: 'Toy Train Set', imageId: 'handicraft-3', price: 55 },
        ],
    },
];

export type CraftLocation = {
    id: string;
    name: string;
    state: string; // The id of the state in the SVG map
    description: string;
    artisans: string[]; // IDs of artisans from this region
};

export const craftLocations: CraftLocation[] = [
    { id: 'cl1', name: 'Madhubani Painting', state: 'Bihar', description: 'Characterized by complex geometrical patterns, these paintings are known for their representation of ritual content.', artisans: ['2'] },
    { id: 'cl2', name: 'Terracotta Pottery', state: 'Rajasthan', description: 'A traditional art form from Rajasthan, involving the creation of earthenware from reddish-brown clay.', artisans: ['1'] },
    { id: 'cl3', name: 'Channapatna Toys', state: 'Karnataka', description: 'Traditional wooden toys and dolls manufactured in the town of Channapatna in Karnataka.', artisans: ['3'] },
    { id: 'cl4', name: 'Warli Painting', state: 'Maharashtra', description: 'A form of tribal art mostly created by the tribal people from the North Sahyadri Range in Maharashtra, India.', artisans: [] },
    { id: 'cl5', name: 'Pattachitra', state: 'Odisha', description: 'A traditional, cloth-based scroll painting based in the eastern Indian states of Odisha and West Bengal.', artisans: [] },
    { id: 'cl6', name: 'Kalamkari', state: 'Andhra Pradesh', description: 'A type of hand-painted or block-printed cotton textile produced in Isfahan, Iran, and in the Indian state of Andhra Pradesh.', artisans: [] },
];
