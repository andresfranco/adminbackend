Rails.application.routes.draw do
  resources :knowledge_areas
  delete 'knowledge_areas/delete_fetch/:id',to:'knowledge_areas#delete_fetch'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
