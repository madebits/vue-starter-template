
<script>
export default {
  name: 'Footer',
  render() {
    return (
      <div class="card border-0 bg-primary text-white rounded-0 p-1">
        <p class="text-center mr-0 mb-0 p-3">
          <i class="fa fa-copyright" aria-hidden="true" />{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    )
  }
}
</script>
