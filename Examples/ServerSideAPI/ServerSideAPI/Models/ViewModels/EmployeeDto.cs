using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerSideAPI.Models.ViewModels
{
    public class EmployeeDto
    {
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string salary { get; set; }
        public string hiredate { get; set; }
    }
}