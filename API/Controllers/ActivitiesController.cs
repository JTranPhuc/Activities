using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult> GetActivities()
        {
            var result = await Mediator.Send(new List.Query());
            return HandlerResult(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetActivity(Guid id)
        {
            var result  = await Mediator.Send(new Details.Query { Id = id });
            return HandlerResult<Activity>(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandlerResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandlerResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandlerResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}