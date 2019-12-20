import React from "react"
import { Link, graphql } from "gatsby"
	
import linkResolver from '../utils/linkResolver.js'

import Layout from "../components/layout"

export const query = graphql`
  {
    prismic {
        allServices {
          edges {
            node {
              main_header {
                title
              }
              _meta {
                type
                uid
              }              
            }
          }
        }
      }      
  }
`;

const IndexPage = ({data}) => (
  <Layout>
    <h1>Our Services</h1>
    <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'space-between'}}>
      {data.prismic.allServices.edges.map(({node: service}) => {
          console.log(service.slug)
        return (
        <li key={service._meta.uid} style={{ flex: '1 45%', maxWidth: '45%', padding: '0', margin: '1rem'}}>
          <h2 style={{fontSize: '24px'}}>{service.main_header[0].title}</h2>
          <Link to={linkResolver(service._meta)}>See service details</Link>
        </li>          
        )
      })}
    </ul>
 
  </Layout>
)

export default IndexPage
