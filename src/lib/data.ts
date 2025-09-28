export type Artisan = {
    id: string;
    name: string;
    craft: string;
    location: string;
    story: string;
    avatarImageId: string;
    gender?: 'male' | 'female';
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
        avatarImageId: 'potter-avatar',
        gender: 'male',
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
        avatarImageId: 'painter-avatar',
        gender: 'female',
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
        avatarImageId: 'toymaker-avatar',
        gender: 'male',
        products: [
            { id: 'p3-1', name: 'Wooden Stacking Rings', imageId: 'handicraft-3', price: 30 },
            { id: 'p3-2', name: 'Colorful Spinning Top', imageId: 'handicraft-3', price: 15 },
            { id: 'p3-3', name: 'Toy Train Set', imageId: 'handicraft-3', price: 55 },
        ],
    },
    {
        id: '4',
        name: 'Lakshmi Nair',
        craft: 'Weaving',
        location: 'Kanchipuram, Tamil Nadu',
        story: 'Lakshmi Nair comes from a family of traditional weavers in Kanchipuram. She specializes in creating exquisite silk sarees with intricate gold thread work, continuing a 500-year-old family tradition.',
        avatarImageId: 'weaver-avatar',
        gender: 'female',
        products: [
            { id: 'p4-1', name: 'Kanchipuram Silk Saree', imageId: 'handicraft-1', price: 350 },
            { id: 'p4-2', name: 'Temple Border Saree', imageId: 'handicraft-1', price: 280 },
        ],
    },
    {
        id: '5',
        name: 'Arjun Sharma',
        craft: 'Jewelry',
        location: 'Jaipur, Rajasthan',
        story: 'Arjun Sharma is a master jeweler specializing in traditional Kundan and Meenakari work. His family has been creating royal jewelry for over 200 years, serving maharajas and now bringing this art to the world.',
        avatarImageId: 'jeweler-avatar',
        gender: 'male',
        products: [
            { id: 'p5-1', name: 'Kundan Necklace Set', imageId: 'handicraft-2', price: 450 },
            { id: 'p5-2', name: 'Meenakari Earrings', imageId: 'handicraft-2', price: 180 },
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
    // Northern States
    { id: 'cl1', name: 'Pashmina Shawls', state: 'Jammu and Kashmir', description: 'Luxurious handwoven shawls made from the finest cashmere wool, known for their intricate patterns and warmth.', artisans: [] },
    { id: 'cl2', name: 'Thangka Paintings', state: 'Ladakh', description: 'Traditional Buddhist scroll paintings depicting deities, mandalas, and spiritual scenes.', artisans: [] },
    { id: 'cl3', name: 'Kullu Shawls', state: 'Himachal Pradesh', description: 'Colorful handwoven woolen shawls with geometric patterns, traditionally made in the Kullu valley.', artisans: [] },
    { id: 'cl4', name: 'Phulkari Embroidery', state: 'Punjab', description: 'Vibrant floral embroidery work on shawls and dupattas, literally meaning "flower work".', artisans: [] },
    { id: 'cl5', name: 'Blue Pottery', state: 'Rajasthan', description: 'Distinctive glazed pottery in blue and white, originally from Persia but perfected in Jaipur.', artisans: ['1'] },
    { id: 'cl6', name: 'Chikankari', state: 'Uttar Pradesh', description: 'Delicate white-on-white embroidery work, traditionally done on fine muslin fabric.', artisans: [] },
     { id: 'cl24', name: 'Wood Carving & Aipan', state: 'Uttarakhand', description: 'Intricate wood carvings and Aipan folk art paintings.', artisans: [] },
    { id: 'cl25', name: 'Durries & Shawls', state: 'Haryana', description: 'Hand-woven durries (rugs) and shawls.', artisans: [] },
        {id: 'cl31', name: 'Zardozi Embroidery', state: 'Delhi', description: 'Intricate metal embroidery.', artisans: [] },

    // Western States
    { id: 'cl7', name: 'Bandhani Tie-Dye', state: 'Gujarat', description: 'Ancient tie-dye technique creating intricate patterns through selective dyeing of fabric.', artisans: [] },
    { id: 'cl8', name: 'Warli Painting', state: 'Maharashtra', description: 'Tribal art form using simple geometric shapes to depict daily life and nature.', artisans: [] },
    { id: 'cl9', name: 'Azulejo Tiles', state: 'Goa', description: 'Portuguese-influenced decorative ceramic tiles with intricate blue and white patterns.', artisans: [] },
    
    // Central States
    { id: 'cl10', name: 'Chanderi Silk', state: 'Madhya Pradesh', description: 'Lightweight, sheer fabric with a glossy texture, traditionally woven with gold and silver threads.', artisans: [] },
    { id: 'cl11', name: 'Dhokra Metal Craft', state: 'Chhattisgarh', description: 'Ancient lost-wax casting technique used to create brass and bronze figurines.', artisans: [] },
    { id: 'cl12', name: 'Madhubani Painting', state: 'Bihar', description: 'Colorful folk art featuring geometric patterns, nature motifs, and mythological themes.', artisans: ['2'] },
    { id: 'cl13', name: 'Dokra Art', state: 'Jharkhand', description: 'Traditional metal casting art creating decorative items using the lost-wax technique.', artisans: [] },
    
    // Eastern States
    { id: 'cl14', name: 'Kantha Embroidery', state: 'West Bengal', description: 'Running stitch embroidery creating beautiful quilts and garments with recycled fabrics.', artisans: [] },
   { id: 'cl15', name: 'Appliqué & Silver Filigree', state: 'Odisha', description: 'Appliqué work and intricate silver filigree jewelry and decorative items.', artisans: [] },
    { id: 'cl16', name: 'Muga Silk', state: 'Assam', description: 'Golden silk produced by silkworms native to Assam, known for its natural golden color.', artisans: [] },
    { id: 'cl17', name: 'Bamboo Crafts', state: 'Meghalaya', description: 'Intricate basketry and utility items crafted from locally sourced bamboo.', artisans: [] },
    { id: 'cl18', name: 'Manipuri Textiles', state: 'Manipur', description: 'Handwoven textiles with intricate patterns, especially the traditional Manipuri shawls.', artisans: [] },
        { id: 'cl26', name: 'Naga Shawls', state: 'Nagaland', description: 'Unique patterned shawls.', artisans: [] },
        { id: 'cl27', name: 'Bamboo and cane Crafts', state: 'Arunachal Pradesh', description: 'Unique items made from Bamboo.', artisans: [] },
        { id: 'cl28', name: 'Puanchei textile', state: 'Mizoram', description: 'Traditional textile patterns.', artisans: [] },

    // Southern States
    { id: 'cl19', name: 'Mysore Silk', state: 'Karnataka', description: 'Lustrous silk sarees with rich colors and gold thread work, traditionally made in Mysore.', artisans: ['3'] },
    { id: 'cl20', name: 'Kalamkari', state: 'Andhra Pradesh', description: 'Hand-painted or block-printed cotton textiles depicting mythological stories.', artisans: [] },
    { id: 'cl21', name: 'Pochampally Ikat, Nirmal Paintings, Bidri craft', state: 'Telangana', description: 'Geometric resist-dyeing technique creating distinctive diamond patterns on silk and cotton.', artisans: [] },
    { id: 'cl22', name: 'Tanjore Paintings', state: 'Tamil Nadu', description: 'Classical South Indian paintings with rich colors, gold foil, and precious stones.', artisans: [] },
    { id: 'cl23', name: 'Kathakali Masks', state: 'Kerala', description: 'Elaborate painted masks and costumes used in traditional Kathakali dance performances.', artisans: [] },
        { id: 'cl29', name: 'Thangka Paintings', state: 'Sikkim', description: 'Depicting deities and religious figures.', artisans: [] },
        { id: 'cl30', name: 'Bamboo and Cane Handicrafts, loinloom weaving', state: 'Tripura', description: 'Handicrafts from Bamboo cane', artisans: [] },
];
