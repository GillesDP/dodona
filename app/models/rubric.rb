# == Schema Information
#
# Table name: rubrics
#
#  id                     :bigint           not null, primary key
#  evaluation_exercise_id :bigint           not null
#  maximum                :decimal(5, 2)    not null
#  name                   :string(255)      not null
#  visible                :boolean          default(TRUE), not null
#  description            :text(65535)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class Rubric < ApplicationRecord
  belongs_to :evaluation_exercise

  has_many :scores, dependent: :destroy
  # Who updated the rubric. This is used to modify scores if necessary.
  attr_accessor :last_updated_by

  after_create :undo_complete_feedbacks_and_set_blank_to_zero
  after_update :undo_complete_feedbacks_if_maximum_changed

  validates :maximum, numericality: { greater_than: 0 }

  private

  def undo_complete_feedbacks_if_maximum_changed
    # If we didn't modify the maximum, it has no impact on the existing feedbacks.
    return unless saved_change_to_maximum?

    undo_complete_feedbacks
  end

  def undo_complete_feedbacks_and_set_blank_to_zero
    evaluation_exercise
      .feedbacks
      .find_each do |feedback|
      Score.create(rubric: self, feedback: feedback, score: 0, last_updated_by: last_updated_by) if feedback.submission.blank?
    end

    undo_complete_feedbacks
  end

  def undo_complete_feedbacks
    evaluation_exercise
      .feedbacks
      .complete
      .find_each do |feedback|
      feedback.update(completed: false) if feedback.submission.present?
    end
  end
end
