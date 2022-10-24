/* Taken from https://github.com/schneidmaster/react-autolink-text/blob/master/src/url_match.js */

/**
 * A regular expression used to remove the 'http://' or 'https://' and/or the 'www.' from URLs.
 */
 const URL_PREFIX_REGEX = /^(https?:\/\/)?(www\.)?/i;

 /**
  * A regular expression used to remove the 'mailto:' from URLs.
  */
 const MAILTO_PREFIX_REGEX = /^mailto:/;
 
 /**
  * The regular expression used to remove the protocol-relative '//' from the {@link #url} string, for purposes
  * of {@link #getAnchorText}. A protocol-relative URL is, for example, "//yahoo.com"
  */
 const PROTOCOL_RELATIVE_REGEX = /^\/\//;
 
 /**
  * @class Autolinker.match.Url
  *
  * Represents a Url match found in an input string which should be Autolinked.
  */
 export default class URLMatch {
   constructor(url, protocolMailtoMatch, protocolUrlMatch, protocolRelativeMatch, position, disableUrlStripping) {
     this._url = url;
     this._protocolMailtoMatch = protocolMailtoMatch;
     this._protocolUrlMatch = protocolUrlMatch;
     this._protocolRelativeMatch = protocolRelativeMatch;
     this.position = position;
     this.disableUrlStripping = disableUrlStripping;
     /**
      * Will be set to `true` if the 'http://' protocol has been prepended to the {@link #url} (because the
      * {@link #url} did not have a protocol)
      */
     this.protocolPrepended = false;
   }
 
   /**
    * Returns the url that was matched, assuming the protocol to be 'http://' if the original
    * match was missing a protocol.
    *
    * @return {String}
    */
   getUrl() {
     let url = this._url;
 
     // if the url string doesn't begin with a protocol, assume 'http://'
     if( !this._protocolMailtoMatch && !this._protocolRelativeMatch && !this._protocolUrlMatch && !this.protocolPrepended ) {
       url = this._url = 'http://' + url;
 
       this.protocolPrepended = true;
     }
 
     return url;
   }
 
   /**
    * Returns the anchor href that should be generated for the match.
    *
    * @return {String}
    */
   getAnchorHref() {
     var url = this.getUrl();
 
     return url.replace( /&amp;/g, '&' );  // any &amp;'s in the URL should be converted back to '&' if they were displayed as &amp; in the source html
   }
 
   /**
    * Returns the anchor text that should be generated for the match.
    *
    * @return {String}
    */
   getAnchorText() {
     var anchorText = this.getUrl();
 
     if(this.disableUrlStripping) {
       return anchorText;
     }
 
     if(this._protocolRelativeMatch) {
       // Strip off any protocol-relative '//' from the anchor text
       anchorText = this.stripProtocolRelativePrefix(anchorText);
     }
 
     if(this._protocolMailtoMatch) {
       anchorText = this.stripMailtoPrefix(anchorText);
     }
 
     anchorText = this.stripUrlPrefix(anchorText); // remove URL prefix
     anchorText = this.removeTrailingSlash(anchorText);  // remove trailing slash, if there is one
 
     return anchorText;
   }
 
   // ---------------------------------------
 
   // Utility Functionality
 
   /**
    * Strips the URL prefix (such as "http://" or "https://") from the given text.
    *
    * @private
    * @param {String} text The text of the anchor that is being generated, for which to strip off the
    *   url prefix (such as stripping off "http://")
    * @return {String} The `anchorText`, with the prefix stripped.
    */
   stripUrlPrefix(text) {
     return text.replace(URL_PREFIX_REGEX, '');
   }
 
   /**
    * Strips the "mailto:" from the anchor text.
    *
    * @private
    * @param {String} text The text of the anchor that is being generated, for which to strip off the
    *   url prefix (such as stripping off "mailto:")
    * @return {String} The `anchorText`, with the prefix stripped.
    */
   stripMailtoPrefix(text) {
     return text.replace(MAILTO_PREFIX_REGEX, '');
   }
 
   /**
    * Strips any protocol-relative '//' from the anchor text.
    *
    * @private
    * @param {String} text The text of the anchor that is being generated, for which to strip off the
    *   protocol-relative prefix (such as stripping off "//")
    * @return {String} The `anchorText`, with the protocol-relative prefix stripped.
    */
   stripProtocolRelativePrefix(text) {
     return text.replace(PROTOCOL_RELATIVE_REGEX, '');
   }
 
   /**
    * Removes any trailing slash from the given `anchorText`, in preparation for the text to be displayed.
    *
    * @private
    * @param {String} anchorText The text of the anchor that is being generated, for which to remove any trailing
    *   slash ('/') that may exist.
    * @return {String} The `anchorText`, with the trailing slash removed.
    */
   removeTrailingSlash(anchorText) {
     if(anchorText.charAt(anchorText.length - 1) === '/') {
       anchorText = anchorText.slice( 0, -1 );
     }
     return anchorText;
   }
 }