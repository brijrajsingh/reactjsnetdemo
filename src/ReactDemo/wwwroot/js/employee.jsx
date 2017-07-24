var EmployeeBlock = React.createClass({
    loadEmployeesFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    getInitialState() {
        //var values = [
        //  { id:1, created_at: 1, title: "mr. ", name: "brijraj singh" },
        //  { id:2, created_at: 1, title: "mr. ", name: "rajesh singh" },
        //  { id:3, created_at: 1, title: "mr. ", name: "prakendra singh" }
        //];
        return { data: [],addNew:false }
    },
    componentWillMount: function () {
        this.loadEmployeesFromServer();
        window.setInterval(this.loadEmployeesFromServer, this.props.pollInterval);
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
        data.append('id', id);
        data.append('title', title);
        data.append('name', name);
        data.append('created_at', created_at);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadEmployeesFromServer();
        }.bind(this);
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
                    <div className="employee" key={row.id}>
                    <div className="created_at">{row.created_at}</div>
                    <div className="title">{row.title}</div>
                    <div className="name">{row.name}
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


ReactDOM.render(
  <EmployeeBlock url="/employees" pollInterval={2000} submitUrl="/employees/new" deleteUrl="/employees/delete"  />,
  document.getElementById('content')
);