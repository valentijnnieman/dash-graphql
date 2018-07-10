# Dash GraphQL Component Suite prototypes

These component prototypes help you create easy-to-use GraphQL queries in Dash. They're inspired by Apollo, in that the idea is to inject GraphQL data from queries into Dash components. An example is included in `usage.py`! To run this example, you probably have to first run `python setup.py install`, before running `python usage.py`.

### WIP
So this is a work in progress - what's there now is the ability to:
* Fire queries
* Fire mutations
* Assign callbacks to Query and Mutation components
* Inject data received into Query and Mutation's children prop

This last bit is interesting, because you could potentially write a `layout` that has some `Query` components in it, and set it's `children` to the components you want to handle that data! It works - it's just that the components don't know what to do with that data: in the example, a query is fired to get a user, and it's value is injected in a `dcc.Input` component, which displays it neatly in it's input box. However, the data passed to `value` is a JSON data object looking something like `{data: {user: { firstName: "Steve" } }}` which is not a simple string that could be displayed in an `dcc.Input` component. Maybe some more custom components that parse this data or have methods to be able to parse this data would be nice to work on!