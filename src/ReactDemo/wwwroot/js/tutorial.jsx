var EmployeeBlock = React.createClass({
    getInitialState() {
        var values = [
          { empid:1, created_at: 1, title: "mr. ", name: "brijraj singh" },
          { empid:2, created_at: 1, title: "mr. ", name: "rajesh singh" },
          { empid:3, created_at: 1, title: "mr. ", name: "prakendra singh" }
        ];
        return { data: values,addNew:false }
    },
    addNew()
    {
        this.setState({ addNew: true })
    },
    saveAndReturn()
    {
        var empid = Math.max.apply(Math, this.state.data.map(function (o) { return o.empid; })) + 1;
        var title = this.refs.employeeTitle.value;
        var name = this.refs.employeeName.value;
        var created_at = "today";
        var objemp = { empid:empid,title: title, name: name, created_at: created_at };
        this.state.data.push(objemp);
        this.setState({ addNew: false })
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
                    <div className="employee" key={row.empid}>
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
  <EmployeeBlock/>,
  document.getElementById('content')
);