require "application_system_test_case"

class KnowledgeAreasTest < ApplicationSystemTestCase
  setup do
    @knowledge_area = knowledge_areas(:one)
  end

  test "visiting the index" do
    visit knowledge_areas_url
    assert_selector "h1", text: "Knowledge areas"
  end

  test "should create knowledge area" do
    visit knowledge_areas_url
    click_on "New knowledge area"

    fill_in "Description", with: @knowledge_area.description
    fill_in "Name", with: @knowledge_area.name
    click_on "Create Knowledge area"

    assert_text "Knowledge area was successfully created"
    click_on "Back"
  end

  test "should update Knowledge area" do
    visit knowledge_area_url(@knowledge_area)
    click_on "Edit this knowledge area", match: :first

    fill_in "Description", with: @knowledge_area.description
    fill_in "Name", with: @knowledge_area.name
    click_on "Update Knowledge area"

    assert_text "Knowledge area was successfully updated"
    click_on "Back"
  end

  test "should destroy Knowledge area" do
    visit knowledge_area_url(@knowledge_area)
    click_on "Destroy this knowledge area", match: :first

    assert_text "Knowledge area was successfully destroyed"
  end
end
