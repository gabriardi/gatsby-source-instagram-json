export async function scrapingInstagramPosts({ instagramData }) {
  const photos = []
  instagramData.data.user.edge_owner_to_timeline_media.edges.forEach((edge) => {
    if (edge.node) {
      photos.push(edge.node)
    }
  })
  return photos
}
