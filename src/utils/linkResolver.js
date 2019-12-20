// In src/prismic-configuration.js
export const linkResolver = (doc) => {

    console.log(doc)
    // URL for a service type
    if (doc.type === 'service') {
      return `/${doc.type}/${doc.uid}`
    }
    // Backup for all other types
    return '/'
  }