import React from 'react';
import { Link, graphql } from 'gatsby'
import {RichText} from 'prismic-reactjs';
import serializer from '../utils/htmlSerializer.js'
import Layout from '../components/layout'

import 'bootstrap/dist/css/bootstrap.min.css';

export const query = graphql`
query MyQuery ($uid: String){
    prismic {
        allServices (uid: $uid){
          edges {
            node {
              main_header {
                title
                image
              }
              cta_large {
                button_text
                button_url {
                  ... on PRISMIC__ExternalLink {
                    url
                  }
                }
                sub_title
                title
              }
              service_description {
                content
                title
              }
              tips {
                content
                title
              }
              body {
                ... on PRISMIC_ServiceBodyFeature_list {
                  fields {
                    feature {
                      ... on PRISMIC_Feature {
                        name
                      }
                    }
                  }
                  primary {
                    title
                  }
                  type
                }
                ... on PRISMIC_ServiceBodyTestimonial_list {
                  type
                  fields {
                    testimonial {
                      ... on PRISMIC_Testimonial {
                        name
                        description
                      }
                    }
                  }
                  primary {
                    title
                  }
                }
              }
            }
          }
        }
      }
  }
  
`;


export default ({ data }) => {
    let service = data.prismic.allServices.edges[0].node
    console.log(service)
    
    return (
        <Layout>
            <div style={{
                backgroundImage: `url(${service.main_header[0].image.url}) `,
                backgroundRepeat  : 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '1rem 2rem',
                marginBottom: '1rem'
                }}>
                <h2 style={{color: 'white'}}>{service.main_header[0].title}</h2>
            </div>
            <div>
                <div className="row mb-3">
                    {service.service_description.map((el, index) => {
                        if (index === 0 || index % 2 === 0) {
                            return (
                                <div className="col-md-8">
                                    <RichText render={el.content} htmlSerializer={serializer}/>
                                </div>
                            )
                        } else {
                            return (
                                <div className="col-md-4">
                                    <RichText render={el.content} htmlSerializer={serializer}/>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="row mb-3">
                {/* <div className="col-md-8">
                    <h2>{service.testimonialList.title}</h2>
                        {data.service.testimonialList.list.map(test => {
                        return(
                            <div className="card">
                            <div className="card-body">
                                <p>{test.customerTestimonial}</p>
                                <p>{test.customerName}</p>
                            </div>
                            </div>
                        )
                    })}
                </div> */}
                {/* <div className="col-md-4">
                    <h2>{service.body.filter(el => el.type === "feature_list")[0].primary.title}</h2> 
                    <ul>
                        {data.service.featureList.Features.map(feat => {
                        return <li>{feat.title}</li>
                        })}
                    </ul>
                </div>    */}
            </div>
            <div className="row mb-3">
                <div className={`text-center my-3 col-md-12`}>
                <h2>{service.cta_large[0].title}</h2>
                <p>{service.cta_large[0].sub_title}</p>
                <a href={service.cta_large[0].button_url.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">{service.cta_large[0].button_text}</a>
                </div>  
            </div>
            <div className="row mb-3">
                {service.tips.map((el, index) => {
                    if (index === 0) {
                        return (
                            <div className="col-md-12">
                                <RichText render={el.content} htmlSerializer={serializer}/>
                            </div>
                        )
                    } else {
                        const content = el.content.filter(e => e.type !== 'image')
                        const imageRight = el.content.filter(e => e.type === 'image')
                        return (
                            <>
                            <div className="col-md-8">
                                <RichText render={content} htmlSerializer={serializer}/>            
                            </div>
                            <div className="col-md-4">
                                <RichText render={imageRight} htmlSerializer={serializer}/>
                            </div> 
                            </>   
                        )
                    }
                })}
            </div>
            <Link to="/">Back to Home</Link>
        </Layout>
    )
}