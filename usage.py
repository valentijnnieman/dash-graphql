# -*- coding: utf-8 -*-
import dash
import dash_core_components as dcc
import dash_graphql as dgql
import dash_html_components as html
from dash.dependencies import Input, Output


app = dash.Dash()

app.scripts.config.serve_locally = True

app.layout = html.Div(children=[
    # A query with variables, and children that get it's value injected with the return data of the query
    dgql.Query(id='gql-query-2', endpoint='https://fakerql.com/graphql',
               query='GetUser($id: ID!) { User(id: $id){firstName}}', variables={'id': "cjjeefloc01kf2i106a0bf1k9"}, children=[
                   dcc.Input(id='graphql-updated-input', value='init')
               ]
               ),
    # A simple mutation query
    dgql.Mutation(id='login-mutation', endpoint='https://fakerql.com/graphql',
    mutation='{login(email: "Guy_Abbott38@yahoo.com", password: "dunno"){token}}'),

    # A simple query, unnamed, can have it's value as a callback Input
    dgql.Query(id='gql-query', endpoint='https://fakerql.com/graphql',
               query='{allUsers{firstName}}'),

    dcc.Graph(
        id='example-graph',
    )
])


@app.callback(Output('example-graph', 'figure'), [Input('gql-query', 'value')])
def return_gql_data(data):
    # This callback gets the value of a dgql.Query component
    if data != None:

        all_names = []
        for user in data['allUsers']:
            all_names.append(user['firstName'])

        all_names_length = []
        for name in all_names:
            all_names_length.append(len(name))

        print(all_names)
        return {
            'data': [
                {'x': all_names, 'y': all_names_length,
                    'type': 'bar', 'name': 'Users'},
            ],
            'layout': {
                'title': 'Length of First Names'
            }
        }
    else:
        return {'data': {}}


if __name__ == '__main__':
    app.run_server(debug=True)
