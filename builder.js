'use strinct';

let KssBuilderBaseHandlebars;

try{
  KssBuilderBaseHandlebars = require('kss/builder/base/handlebars');
}catch(e){
  KssBuilderBaseHandlerbars = require('../base/handlebars');
}

class KssBuilderHandlebars extends KssBuilderBaseHandlebars{
  constructor(){
    super();
    this.addOptionDefinitions({
      title:{
        group: 'Style guide',
	string: true,
	multiple: false,
	describe: 'Title of the style guide',
	default: 'KSS Style Guide'
      }
    });
  }

  /*
   * @param {} styleGuide
   * @returns {Promise.<KssStyleGuide>}
   */
  prepare(styleGuide){
    return super.prepare(styleGuide).then(styleGuide => {
      if(!this.Handlebars.helpers['section']){
        /*
	 * @param {String} reference
	 */
	this.Handlebars.registerHelper('section', function(reference, options){
	  let section = options.data.root.styleGuide.sections(reference);

	  return section.toJSON ? options.fn(section.toJSON()) : options.inverse('');
	});
      if(!this.Handlebars.helpers['eachSection']){
	/*
	 * @param {Mixed} query
	 */
        this.Handlebars.registerHelper('eachSection', function(query, options){
	  let StyleGuide = options.data.root.styleGuide;

	  if(!query.match(/\bx\b|\*/g)){
	    query = query + '.*';
	  }
	  let sections = styleGuide.sections(query);
	  if(!sections.length){
	    return options.inverse('');
	  }

	  let l = sections.length;
	  let buffer = '';
	  for(let i = 0; i < l; i += 1){
	    buffer += options.fn(sections[i].toJSON());
	  }

	  return buffer;
	});
      }

      return Promise.resolve(styleGuide);
    });
  }
}

module.exports = KssBuilderhandlebars;

