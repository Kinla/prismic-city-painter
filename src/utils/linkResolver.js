// In src/prismic-configuration.js
const linkResolver = (doc) => {

    console.log(doc)
    // URL for a service type
    if (doc.type === 'service') {
      return `/${doc.type}/${doc.uid}`
    }
    // Backup for all other types
    return '/'
  }

export default linkResolver