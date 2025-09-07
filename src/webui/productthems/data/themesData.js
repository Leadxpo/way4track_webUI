const themesData = [
  {
    id: 'theme1',
    title: 'Modern Showcase',
    description: 'A clean, modern layout with emphasis on visual elements and product features',
    fields: ['name', 'shortDescription', 'description'],
    images: 3,
    stepFields: {
      2: ['name', 'desc', 'image'],
      3: ['name', 'desc', 'image'],
      4: ['name', 'model', 'image', 'price']
    }
  },
  {
    id: 'theme2',
    title: 'Professional Grid',
    description: 'Structured layout with grid-based sections for detailed product information',
    fields: ['name', 'shortDescription', 'description'],
    images: 3,
    stepFields: {
      2: ['name', 'desc', 'image'],
      3: ['name', 'desc', 'image'],
      4: ['name', 'model', 'image', 'price']
    }
  },
  {
    id: 'theme3',
    title: 'Elegant Display',
    description: 'Elegant and minimal design that puts your product in the spotlight',
    fields: ['name', 'shortDescription', 'description'],
    images: 1,
    stepFields: {
      2: ['name', 'desc', 'image'],
      3: ['name', 'desc', 'image'],
      4: ['name', 'model', 'image', 'price']
    }
  },
  {
    id: 'theme4',
    title: 'Tech Focused',
    description: 'Technical layout that emphasizes specifications and detailed information',
    fields: ['name', 'shortDescription', 'description'],
    images: 2,
    stepFields: {
      2: ['name', 'desc', 'image'],
      3: ['name', 'desc', 'image'],
      4: ['name', 'model', 'image', 'price']
    }
  }
];

export default themesData;