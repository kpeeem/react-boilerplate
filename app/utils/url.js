import urlParse from 'url-parse';

//http://bl.ocks.org/abernier/3070589
export default class url {
  constructor(customUrl=null) {
    customUrl && (customUrl = urlParse(customUrl, true))
    Object.keys(customUrl || window.location).map((key) => {
      this[key] = customUrl ? customUrl[key] : window.location[key]
    });  
  }
  static init = (customUrl=null) => {
        return new url(customUrl);
  };
  get(params='href'){
    if(params === 'href'){
      this.str = this.protocol + '//' + this.hostname + this.port + this.pathname + this.search + this.hash
      return this
    }else if(params === 'protocol'){
      this.str = this.protocol
      return this
    }else if(params === 'hostname'){
      this.str = this.hostname
      return this
    }else if(params === 'origin'){
      this.str = this.protocol + '://' + this.hostname
      return this
    }
    else if(params === 'port'){
      this.str = this.port 
      return this
    }else if(params === 'host'){
      this.str = this.hostname + this.port
      return this
    }else if(params === 'search'){
      this.search || this.setSearch(Object.keys(this.query).reduce((acc, val) => acc + '&' + val + '=' + this.query[val]))
      this.str = this.search 
      return this
    }else if(params === 'hash'){
      this.str = this.hash.substring(0,40)
      return this
    }
    else if(typeof params === 'object'){
      this.str = params.map((key) => this[key]).join('')
      return this
    }
  }
  toStr = (slash={after:null,begin:null}) => {

      if(slash.begin === 'add'){
        this.str = '/' + this.str
      }if(slash.after === 'add'){
        this.str = this.str + '/'
      }if(slash.begin === 'remove'){
        this.str = this.str.substring(1)
      }if(slash.after === 'remove'){
        this.str = this.str.substring(0,this.str.length-1)
      }
    return this.str
  }
  
  setProtocol = (protocol=null) => {
      this.protocol = protocol
      return this
  }
  setHostname = (hostname=null) => {
      this.hostname = hostname
      return this
  }
  setPort = (port=null) => {
      this.port = port
      return this
  }
  setSearch = (search=null) => {
      this.search = search
      return this
  }
  setHash = (hash=null) => {
      this.hash = hash
      return this
  }
  getHashSection = (HashObject=null) => {
    let obj = this.hash.split('&').reduce((acc,x) => this.strArr2Obj(acc,x));
    if(HashObject){
      return obj[HashObject]
    }else{
      return obj
    }
  }
  setHashSection = (key=null, val=null) => {
    var obj = this.getHashSection()
    obj[key] = val;
    this.setHash(Object.keys(obj).reduce( (acc, val) => acc + '&' + val + '=' + obj[val] ));
    return this
  }
  push = (data=null,title=null) => {
    window.pushState(data,title,this.get());
  }
  navigate = (href=this.href) => {
    window.location.href = href
  }
  strArr2Obj = (acc,x) => {
    if(typeof acc !== 'object'){
      let acc = {}
      acc[x.split("=")[0]] = x.split("=")[1];
      return acc
    }else{
      acc[x.split("=")[0]] = x.split("=")[1]
      return acc
    }
  }
  
}



  // .map((val) => {
  // // acc[val.split('=')[0]] = val.split('=')[1];
  //   return acc+=val.split('=')[0]+'+' +val.split('=')[1]
  // })  