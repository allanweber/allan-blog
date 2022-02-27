/* Vendor imports */
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Config from '../../config'
import ArchivePagination from '../components/archive-pagination'
/* App imports */
import Layout from '../components/layout'
import PostList from '../components/post-list'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" description={Config.siteDescription} path="" />
    <PostList posts={data.allMarkdownRemark.edges} />
    <ArchivePagination nextPage={2} />
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  {
    allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/index.md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            tags
            excerpt
            cover {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
