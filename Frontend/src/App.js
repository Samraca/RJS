import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { EstadoView } from './components/estados/EstadoView';
import { InventarioView } from './components/inventarios/InventarioView';
import { MarcaView } from './components/marcas/MarcaView';
import { TiposView } from './components/tipos/TiposView';
import { UsuariosView } from './components/usuarios/UsuariosView';
import { InventarioUpdate } from './components/inventarios/inventarioUpdate';
import { UsuarioUpdate } from './components/usuarios/UsuarioUpdate';
import { MarcaUpdate } from './components/marcas/MarcaUpdate';
import { TiposUpdate } from './components/tipos/TiposUpdate';
import {EstadoUpdate} from './components/estados/EstadoUpdate';

const App = () => {
    return <Router>
        <Header />
        <Switch>
            <Route exact path = '/' component = { InventarioView } />
            <Route exact path = '/usuarios' component = { UsuariosView } />
            <Route exact path = '/marcas' component = { MarcaView } />
            <Route exact path = '/estados' component = { EstadoView } />
            <Route exact path = '/tipos' component = { TiposView } />
            <Route exact path = '/inventarios/edit/:id' component = { InventarioUpdate } />
            <Route exact path = '/usuarios/edit/:userId' component = { UsuarioUpdate } />
            <Route exact path = '/marcas/edit/:marcaId' component = { MarcaUpdate } />
            <Route exact path = '/tipoEquipos/edit/:tipoEquipoId' component = { TiposUpdate } />
            <Route exact path = '/estadoEquipos/edit/:estadoEquipoId' component = { EstadoUpdate } />
            <Redirect to='/' />
        </Switch>
    </Router>
}

export {
    App,
}