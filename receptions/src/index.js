import dva from 'dva';
import  './styles/themes/default.less'

import { hostList } from './api/host';


hostList({sortid:-1,pageIndex:1,pageSize:10}).then((res)=>{
  // 1. Initialize

  const app = dva({
    initialState: {
      host:
        {
          data:res.data,
          page:{
            total:res.total,
            pageSize:10,
            pageIndex:res.currPage
          },
          hostVisible:false,
          isEdit:false,
          modelVisible:false
        }
    },

  });

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
  app.model(require('./models/Host').default);
  app.model(require('./models/Login').default);

// 4. Router
  app.router(require('./router').default);

// 5. Start
  app.start('#root');



}).catch((res)=>{

});

