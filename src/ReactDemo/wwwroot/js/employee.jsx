

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
        var id = Math.max.apply(Math, this.state.data.map(function (o) { return o.Id; })) + 1;
        
        var title = this.refs.employeeTitle.value;
        var name = this.refs.employeeName.value;
        var created_at = "today";

        var obj = { 'Id': id, 'Title': title, 'Name': name, 'Created_At': created_at };
        
        this.setState({ addNew: false })

        var data = new FormData();
        data.append('Id', id);
        data.append('Title', title);
        data.append('Name', name);
        data.append('Created_At', created_at);

        var employeesList = this.state.data;
        employeesList.push(obj);
         
        this.setState({ data: employeesList });

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.send(data);
    },
    delete (item) {
        var data = new FormData();
        data.append('id', item.id);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.deleteUrl, true);
        xhr.onload = function () {
            this.loadEmployeesFromServer();
        }.bind(this);
        xhr.send(data);
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
