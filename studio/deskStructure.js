import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Author")
        .child(S.document().schemaType("author").documentId("author")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["author"].includes(listItem.getId())
      ),
    ]);
