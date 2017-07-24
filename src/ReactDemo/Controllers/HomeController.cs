using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactDemo.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactDemo.Controllers
{
    public class HomeController : Controller
    {
        private static readonly IList<EmployeeModel> _employees;


        static HomeController()
        {
            _employees = new List<EmployeeModel>
            {
                new EmployeeModel
                {
                    Id = 1,
                    Title = "Mr.",
                    Name = "brijraj Singh",
                    Created_At = DateTime.Now.ToShortDateString()
                },
                new EmployeeModel
                {
                    Id = 2,
                    Title = "Mr.",
                    Name = "Baj Singh",
                    Created_At = DateTime.Now.ToShortDateString()
                },
                new EmployeeModel
                {
                    Id = 3,
                    Title = "Ms.",
                    Name = "Kusum Singh",
                    Created_At = DateTime.Now.ToShortDateString()
                }
            };
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [Route("employees")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult Employees()
        {
            return Json(_employees);
        }

        [Route("employees/new")]
        [HttpPost]
        public ActionResult AddEmployee(EmployeeModel employee)
        { 
            _employees.Add(employee);
            return Content("Success :)");
        }

        [Route("employees/delete")]
        [HttpPost]
        public ActionResult delete(EmployeeModel employee)
        {
            var itemToRemove = _employees.Single(r => r.Id == employee.Id);
            _employees.Remove(itemToRemove);
            return Content("Success");
        }
    }
}
