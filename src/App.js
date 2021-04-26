import React from 'react';
import items from '../data';
import Filter from './Filter';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
	return <Filter data={items} />;
}

export default App;
