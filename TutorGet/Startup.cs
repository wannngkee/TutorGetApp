using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TutorGet.Startup))]
namespace TutorGet
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
