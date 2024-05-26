from django.template import RequestContext
from django.views.defaults import page_not_found

def custom_404(request, exception):
    response = page_not_found(request, exception, template_name="templates/404.html")
    response.status_code = 404
    return response
