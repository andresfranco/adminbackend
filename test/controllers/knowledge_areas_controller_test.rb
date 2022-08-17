require "test_helper"

class KnowledgeAreasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @knowledge_area = knowledge_areas(:one)
  end

  test "should get index" do
    get knowledge_areas_url
    assert_response :success
  end

  test "should get new" do
    get new_knowledge_area_url
    assert_response :success
  end

  test "should create knowledge_area" do
    assert_difference("KnowledgeArea.count") do
      post knowledge_areas_url, params: { knowledge_area: { description: @knowledge_area.description, name: @knowledge_area.name } }
    end

    assert_redirected_to knowledge_area_url(KnowledgeArea.last)
  end

  test "should show knowledge_area" do
    get knowledge_area_url(@knowledge_area)
    assert_response :success
  end

  test "should get edit" do
    get edit_knowledge_area_url(@knowledge_area)
    assert_response :success
  end

  test "should update knowledge_area" do
    patch knowledge_area_url(@knowledge_area), params: { knowledge_area: { description: @knowledge_area.description, name: @knowledge_area.name } }
    assert_redirected_to knowledge_area_url(@knowledge_area)
  end

  test "should destroy knowledge_area" do
    assert_difference("KnowledgeArea.count", -1) do
      delete knowledge_area_url(@knowledge_area)
    end

    assert_redirected_to knowledge_areas_url
  end
end
