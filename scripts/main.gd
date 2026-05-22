extends Control

var bid_count := 0

@onready var subtitle: Label = $Center/Panel/Margin/VBox/Subtitle
@onready var button: Button = $Center/Panel/Margin/VBox/Button

func _ready() -> void:
	button.pressed.connect(_on_button_pressed)

func _on_button_pressed() -> void:
	bid_count += 1
	subtitle.text = "Current bids: %d" % bid_count
