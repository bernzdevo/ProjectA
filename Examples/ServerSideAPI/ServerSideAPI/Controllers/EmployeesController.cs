using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using LumenWorks.Framework.IO.Csv;
using Newtonsoft.Json;
using ServerSideAPI.Models;
using ServerSideAPI.Models.ViewModels;

namespace ServerSideAPI.Controllers
{
    public class EmployeesController : ApiController
    {
        private DbEmployeeEntities db = new DbEmployeeEntities();

        // GET: api/Employees
        public IQueryable<Employee> GetEmployees()
        {
            return db.Employees;
        }

        // GET: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult GetEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [Route("employee/getimage/{id}")]
        public HttpResponseMessage GetImage(int id)
        {
            //var requestedPhoto = db.Employees.FirstOrDefault(e=>e.empId==id);

            var requestedPhoto = (from e in db.Employees
                                  where e.empId == id
                                  select e).FirstOrDefault();
            if (requestedPhoto != null)
            {
                if (requestedPhoto.picturetype != null)
                {
                    var result = new HttpResponseMessage(HttpStatusCode.OK);
                    MemoryStream memoryStream = new MemoryStream(requestedPhoto.picturefile);
                    result.Content = new ByteArrayContent(memoryStream.ToArray());
                    result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(requestedPhoto.picturetype);
                    return result;
                }
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }


        [Route("employee/csvprocess")]
        public async Task<object> PostProcessCSV()
        {
            //Check if request is MimeMultipart
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);


            foreach (var file in provider.Contents)
            {
                var buffer = await file.ReadAsStreamAsync();
                using (CsvReader csvReader = new CsvReader(new StreamReader(buffer), true))
                {
                    List<Employee> emptable = new List<Employee>();
                    Employee emp = new Employee();
                    int fieldCount = csvReader.FieldCount; //5
                    string[] headers = csvReader.GetFieldHeaders(); //5
                    while (csvReader.ReadNextRecord())
                    {
                        emptable.Add(new Employee
                        {
                            firstname = csvReader[1],
                            lastname = csvReader[2],
                            salary = Decimal.Parse(csvReader[3]),
                            hiredate = DateTime.Parse(csvReader[4])
                        });
                    }
                    ////Save to Database
                    emptable.ForEach(e => db.Employees.Add(e));
                    db.SaveChanges();
                }
            }

            return Ok();
        }



        [Route("employee/image")]
        public async Task<object> PostUploadImage()
        {
            //Check if request is MimeMultipart
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);
            //Read Form data
            var result = await Request.Content.ReadAsMultipartAsync(provider);
            var values = provider.FormData.GetValues(provider.FormData.AllKeys[0])[0];
            //convert stream to EmployeeDto Object
            var employeeData = JsonConvert.DeserializeObject<EmployeeDto>(values);

            var httpRequest = HttpContext.Current.Request;
            var image = httpRequest.Files[0];
            if (image != null)
            {
                Employee newEmployee = new Employee();
                newEmployee.firstname = employeeData.firstname;
                newEmployee.lastname = employeeData.lastname;
                newEmployee.salary = Decimal.Parse(employeeData.salary);
                newEmployee.hiredate = DateTime.Parse(employeeData.hiredate);

                newEmployee.picturetype = image.ContentType;
                newEmployee.picturefilename = Path.GetFileName(image.FileName);
                newEmployee.picturefile = new byte[image.ContentLength];
                image.InputStream.Read(newEmployee.picturefile, 0, image.ContentLength);

                db.Employees.Add(newEmployee);
                db.SaveChanges();

            }
            return Ok();
        }



        // PUT: api/Employees/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployee(int id, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.empId)
            {
                return BadRequest();
            }

            db.Entry(employee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        //// POST: api/Employees
        //[ResponseType(typeof(Employee))]
        //public IHttpActionResult PostEmployee(Employee employee)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Employees.Add(employee);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = employee.empId }, employee);
        //}

        // DELETE: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult DeleteEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            db.Employees.Remove(employee);
            db.SaveChanges();

            return Ok(employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.empId == id) > 0;
        }
    }
}