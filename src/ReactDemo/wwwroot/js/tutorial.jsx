var EmployeeBlock = React.createClass({
    getInitialState() {
        var values = [
          { created_at: 1, title: "mr. ", name: "brijraj singh" },
          { created_at: 1, title: "mr. ", name: "brijraj singh" },
          { created_at: 1, title: "mr. ", name: "brijraj singh" }
        ];
        return { data: values,addNew:false }
    },
    addNew()
    {
        this.setState({ addNew: true })
    },
    saveAndReturn()
    {
        this.setState({ addNew: false })
    },
    renderAddNew()
    {
        return (
            <div id="newemployee">
                <div>
                    <div>
                        <span className="label">Edit Employee Title</span>
                        <input id="editEmployeeTitle" type="text"/>
                    </div>
                    <div>
                        <span className="label">Edit Employee Name</span>
                        <input id="editEmployeeName" type="text" />
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
        var rows = this.state.data.map(function (row) {
                return(
                    <div className="employee">
                    <div className="created_at">{row.created_at}</div>
                    <div className="title">{row.title}</div>
                    <div className="name">{row.name}
                        <div id="delete">X</div>
                        <div id="edit">edit</div>
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