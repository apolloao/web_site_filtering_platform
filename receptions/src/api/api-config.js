
let api_config={};

if(process.env.NODE_ENV === 'production'){
  api_config={
    api:'',
  }
}else{
  api_config={
    api:'/api',
  }
}

export  default api_config;
