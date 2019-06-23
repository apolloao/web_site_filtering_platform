import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Host from './routes/Host';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Host} />;
          <Route path="/host" exact component={Host} />

      </Switch>
    </Router>
  );
}

export default RouterConfig;
