export default {
  name: "technology",
  type: "document",
  title: "Technology",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      option: {
        hotspot: true,
      },
    },
    {
      name: "index",
      title: "Index",
      type: "number",
    },
  ],
};
