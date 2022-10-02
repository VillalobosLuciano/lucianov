import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  "slug": slug.current,
  "author": author->{
    name, 
    picture{
      ..., 
      "lqip": asset->metadata.lqip
    },
     logo{
      ..., 
      "lqip": asset->metadata.lqip
    },
  },
  "categories": categories[]->{
    _id, 
    title, 
    description
  }
`

const projectFields = groq`
  _id,
  title,
  intro,
  description,
  projectType,
  content,
  source,
  link,
  coverImage{
    ..., 
    "lqip": asset->metadata.lqip
  },
  screenshots[]{
    ..., 
    "lqip": asset->metadata.lqip
  },
  "slug": slug.current,
   "technologies": technologies[]->{
    _id, 
    name,  
    logo{
      ..., 
      "lqip": asset->metadata.lqip
    },
  },
  dependencies
`

export const indexQuery = groq`
{
  "projects": *[_type == "project"]{
    ${projectFields}
  },
  "posts": *[_type == "post"] | order(date desc){
    ${postFields}
  },
  "author": *[_type == "author"][0]{
    _id,
    name,
    picture{
      ...,
      "lqip": asset->metadata.lqip
    },
    introduction,
    about
  },
  "technologies": *[_type == "technology"] | order(index asc){
    _id,
    name,
    logo{
      ...,
      "lqip": asset->metadata.lqip
    },
    index
  },
}`

export const postQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const projectQuery = groq`
{
  "project": *[_type == "project" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${projectFields}
  }
}`

export const projectSlugsQuery = groq`
*[_type == "project" && defined(slug.current)][].slug.current
`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`
