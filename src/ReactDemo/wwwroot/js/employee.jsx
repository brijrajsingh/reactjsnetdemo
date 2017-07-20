

function createRemarkable() {
    var remarkable = (("undefined" != typeof global) && (global.Remarkable)) ? global.Remarkable : window.Remarkable;
    return new remarkable();
}

var EmployeeBlock = React.createClass({
    rawMarkup: function ()
    {
        var md = createRemarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    loadEmployeesFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data, addNew: false });
        }.bind(this);
        xhr.send();
    },
    getInitialState() {
        return { data: this.props.initialData };
    },
    componentWillMount: function () {
    },
    addNew()
    {
        this.setState({ addNew: true })
    },
    saveAndReturn()
    {
        var id = Math.max.apply(Math, this.state.data.map(function (o) { return o.id; })) + 1;
        var title = this.refs.employeeTitle.value;
        var name = this.refs.employeeName.value;
        var created_at = "today";
        //var objemp = { id:id,title: title, name: name, created_at: created_at };
        //this.state.data.push(objemp);
        this.setState({ addNew: false })

        var data = new FormData();
        data.append('Id', id);
        data.append('Title', title);
        data.append('Name', name);
        data.append('Created_At', created_at);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadEmployeesFromServer();
        }.bind(this);
        xhr.send(data);
    },
    delete (item) {
        const newState = this.state.data;
        if (newState.indexOf(item) > -1) {
            newState.splice(newState.indexOf(item), 1);
            this.setState({data: newState})
        }
    },
    renderAddNew()
    {
        return (
            <div id="newemployee">
                <div>
                    <div>
                        <span className="label">Edit Employee Title</span>
                        <input id="editEmployeeTitle" ref="employeeTitle" type="text"/>
                    </div>
                    <div>
                        <span className="label">Edit Employee Name</span>
                        <input id="editEmployeeName" ref="employeeName" type="text" />
                    </div>
                    <div id="editEmployeeSubmit">
                        <input type="submit" value="Save" onClick={this.saveAndReturn} />
                    </div>
                </div>
            </div>
        );
    },
    renderList()
    {
        const rows = this.state.data.map((row) => {
                return(
                    <div className="employee" key={row.Id}>
                    <div className="created_at">{row.Created_At}</div>
                    <div className="title">{row.Title}</div>
                    <div className="name">{row.Name}
                        <button onClick={this.delete.bind(this,row)}>Delete</button>
                    </div>
                </div>)
        });

        return (
            <div>
              <div id="employees">
                    {rows}
              </div>
              <a href="#" onClick={this.addNew}>Add new employee</a>
            </div>
    );
    },
    render() {
        return (this.state.addNew) ? this.renderAddNew()
                                    : this.renderList()
    }
});
