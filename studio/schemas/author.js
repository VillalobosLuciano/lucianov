export default {
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "picture",
      title: "Picture",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "introduction",
      title: "Introduction",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "about",
      title: "About",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
