"""webapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('preprocess/', views.preprocess),
    path('wordcloud/', views.wordcloud),
    path('search/', views.search),
    path('search_by_company/', views.search_by_company),
    path('get_latest_date', views.request_latest_doc_date),
    path('add_latest_data', views.add_docs_in_next_day),
    path('get_total_reviews', views.get_total_reviews),
    path('search_by_location/', views.search_by_location),
    path('admin/', admin.site.urls),
]
