module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "./node_modules/bulma/bulma.sass";
        `
      }
    }
  }
};